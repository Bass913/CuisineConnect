const express = require("express");
const { chatWithChef } = require("../controllers/chatbot.js");

const router = express.Router();

router.post("/chat-with-chef", chatWithChef);

module.exports = router;
