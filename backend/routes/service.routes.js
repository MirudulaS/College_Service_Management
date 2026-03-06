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
  completeService
} from "../controllers/service.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  auth,                 // 🔥 MUST BE HERE
  role("USER"),         // 🔥 MUST BE HERE
  upload.single("image"),
  createService
);

router.get("/my", auth, role("USER"), getUserServices);
router.get("/", auth, role("ADMIN", "SERVICE_PROVIDER"), getAllServices);
router.put("/:id/assign", auth, role("ADMIN"), assignService);
router.put("/:id/start", auth, role("SERVICE_PROVIDER"), startService);
router.put("/:id/complete", auth, role("ADMIN", "SERVICE_PROVIDER"), completeService);

export default router;