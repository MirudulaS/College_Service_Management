import Service from "../models/ServiceRequest.js";

// USER → create service
export const createService = async (req, res) => {
  const service = await Service.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json(service);
};

// ADMIN → view all services
export const getAllServices = async (req, res) => {
  const services = await Service.find()
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email");

  res.json(services);
};

// USER → view own services
export const getMyServices = async (req, res) => {
  const services = await Service.find({
    createdBy: req.user.id,
  });

  res.json(services);
};

// SERVICE_PROVIDER → view assigned services
export const getAssignedServices = async (req, res) => {
  const services = await Service.find({
    assignedTo: req.user.id,
  });

  res.json(services);
};

// ADMIN → assign service
export const assignService = async (req, res) => {
  const { serviceId, providerId } = req.body;

  const service = await Service.findByIdAndUpdate(
    serviceId,
    { assignedTo: providerId, status: "ASSIGNED" },
    { new: true }
  );

  res.json(service);
};

// SERVICE_PROVIDER → update status
export const updateServiceStatus = async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(service);
};