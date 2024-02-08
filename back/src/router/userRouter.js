import express from "express";
import {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
} from "../routes/userRoutes.js";

const router = express.Router();

router.get("/:userId", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
