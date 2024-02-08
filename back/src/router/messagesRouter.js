import express from "express";
const router = express.Router();
import {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
    getAllMessagesWithUserDetails,
    getMessageByIdWithUserDetails
} from "../routes/messagesRoutes.js";

router.get("/", getAllMessages);
router.get("/populated", getAllMessagesWithUserDetails);
router.get("/:messageId", getMessageById);
router.get("/:messageId/populated", getMessageByIdWithUserDetails);
router.post("/", createMessage);
router.put("/:messageId", updateMessage);
router.delete("/:messageId", deleteMessage);

export default router;
