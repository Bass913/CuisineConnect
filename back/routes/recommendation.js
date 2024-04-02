const express = require("express");
const { recommendation } = require("../controllers/recommendation.js");

const router = express.Router();

router.post("/recommendation", recommendation);

module.exports = router;
