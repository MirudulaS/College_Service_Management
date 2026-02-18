import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import {getAllUsers, getUserById, deleteUser, updateUserRole} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", auth, role("ADMIN"), getAllUsers);
router.get("/:id", auth, role("ADMIN"), getUserById);
router.delete("/:id", auth, role("ADMIN"), deleteUser);

// ADMIN → update role
router.put("/role/:id", auth, role("ADMIN"), updateUserRole);

export default router;