const express = require("express");
const { suggestAccompaniments } = require("../controllers/accompaniments");

const router = express.Router();

router.post("/accompaniments", suggestAccompaniments);

module.exports = router;
