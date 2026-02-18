import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";

import {
  createService,
  getAllServices,
  getMyServices,
  getAssignedServices,
  assignService,
  updateServiceStatus
} from "../controllers/service.controller.js";

const router = express.Router();

// USER
router.post("/", auth, role("USER"), createService);
router.get("/my", auth, role("USER"), getMyServices);

// SERVICE_PROVIDER
router.get("/assigned", auth, role("SERVICE_PROVIDER"), getAssignedServices);
router.put("/status/:id", auth, role("SERVICE_PROVIDER"), updateServiceStatus);

// ADMIN
router.get("/", auth, role("ADMIN"), getAllServices);
router.put("/assign", auth, role("ADMIN"), assignService);

export default router;