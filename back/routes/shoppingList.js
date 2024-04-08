const express = require("express");
const {
    generateIntelligentShoppingList,
} = require("../controllers/shoppingList.js");

const router = express.Router();

router.post("/generate", generateIntelligentShoppingList);

module.exports = router;
