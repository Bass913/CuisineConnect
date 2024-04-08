const express = require("express");
const {
    getCategory,
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
} = require("../controllers/category.js");

const router = express.Router();

router.get("/", getCategories);
router.get("/:categoryId", getCategory);
router.post("/", createCategory);
router.delete("/:categoryId", deleteCategory);
router.patch("/:categoryId", updateCategory);


module.exports = router;
