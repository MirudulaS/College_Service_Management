import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import multer from "multer";

import {
  createService,
  getUserServices,
  getAllServices,
  assignService,
  startService,
  completeService,
  getProviderWork
} from "../controllers/service.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/* USER */
router.post("/", auth, role("USER"), upload.single("image"), createService);
router.get("/my", auth, role("USER"), getUserServices);

/* ADMIN / PROVIDER */
router.get("/", auth, role("ADMIN", "SERVICE_PROVIDER"), getAllServices);

/* PROVIDER WORK */
router.get("/provider", auth, role("SERVICE_PROVIDER"), getProviderWork);

/* ADMIN ACTIONS */
router.put("/:id/assign", auth, role("ADMIN"), assignService);

/* PROVIDER ACTIONS */
router.put("/:id/start", auth, role("SERVICE_PROVIDER"), startService);

/* COMPLETE */
router.put("/:id/complete", auth, role("ADMIN", "SERVICE_PROVIDER"), completeService);

// router.put("/:id/complete", auth, role("ADMIN", "SERVICE_PROVIDER"), completeService);

export default router;