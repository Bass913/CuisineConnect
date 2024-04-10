const express = require("express");
const { caloricSearch } = require("../controllers/caloricsSearch");

const router = express.Router();

router.post("/caloric", caloricSearch);

module.exports = router;
