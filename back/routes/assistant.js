const express = require("express");
const { search } = require("../controllers/assistant.js");

const router = express.Router();

router.post("/search", search);

module.exports = router;
