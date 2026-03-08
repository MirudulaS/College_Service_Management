import Service from "../models/ServiceRequest.js";

/*
USER → creates request
*/
// import Service from "../models/ServiceRequest.js";

/*
USER → creates request
*/
export const createService = async (req, res) => {
  try {

    // normalize values to match schema enums
    const priority = req.body.priority?.toUpperCase();
    const locationType =
      req.body.locationType === "ACADEMIC"
        ? "COLLEGE"
        : req.body.locationType;

    // find last created service
    const lastService = await Service.findOne().sort({ createdAt: -1 });

    let issueNumber = 1;

    if (lastService && lastService.issueId) {
      const lastNumber = parseInt(lastService.issueId.split("-")[1]);
      issueNumber = lastNumber + 1;
    }

    const issueId = "ISSUE-" + String(issueNumber).padStart(4, "0");

    const service = await Service.create({
      issueId,
      title: req.body.title,
      description: req.body.description,
      locationType,
      block: req.body.block,
      roomNumber: req.body.roomNumber,
      category: req.body.category,
      priority,
      status: "REQUESTED",
      createdBy: req.user._id,
      image: req.file ? req.file.filename : null
    });

    res.json(service);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


/*
USER → get only their requests
*/
export const getUserServices = async (req, res) => {
  try {

    const services = await Service.find({
      createdBy: req.user._id
    });

    res.json(services);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
ADMIN / PROVIDER → get all services
*/
export const getAllServices = async (req, res) => {
  try {

    const services = await Service.find()
      .populate("createdBy", "name email department userType")
      .populate("assignedTo", "name");

    res.json(services);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/*
ADMIN → assign provider with slot
*/
export const assignService = async (req, res) => {
  try {

    const { providerId, scheduledTime } = req.body;

    if (!providerId || !scheduledTime) {
      return res.status(400).json({ message: "Provider and slot required" });
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service request not found" });
    }

    service.assignedTo = providerId;
    service.scheduledTime = scheduledTime;   // keep as string like "09:00 AM"
    service.status = "ASSIGNED";

    await service.save();

    res.json(service);

  } catch (error) {
    console.error("Assign Error:", error);
    res.status(500).json({ message: error.message });
  }
};


/*
PROVIDER → start working
*/
export const startService = async (req, res) => {
  try {

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { status: "IN_PROGRESS" },
      { new: true }
    );

    res.json(service);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
ADMIN / PROVIDER → mark completed
*/
export const completeService = async (req, res) => {
  try {

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { status: "COMPLETED" },
      { new: true }
    );

    res.json(service);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
PROVIDER → get assigned work
*/
export const getProviderWork = async (req, res) => {
  try {

    const works = await Service.find({
      assignedTo: req.user._id
    })
      .populate("createdBy", "name email department userType");

    res.json(works);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};