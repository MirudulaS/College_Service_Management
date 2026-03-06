import Service from "../models/ServiceRequest.js";

/*
  USER → creates request
*/
export const createService = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const service = await Service.create({
      title: req.body.title,
      description: req.body.description,
      locationType: req.body.locationType,
      block: req.body.block,
      roomNumber: req.body.roomNumber,
      category: req.body.category,
      priority: req.body.priority,
      image: req.file ? req.file.filename : null,
      createdBy: req.user._id,
    });

    res.status(201).json(service);

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
    const services = await Service.find({ createdBy: req.user._id });
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
      .populate("createdBy", "name")
      .populate("assignedTo", "name");

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
  ADMIN → assign provider
*/
export const assignService = async (req, res) => {
  try {
    const { providerId } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: providerId,
        status: "ASSIGNED"
      },
      { new: true }
    );

    res.json(service);
  } catch (error) {
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