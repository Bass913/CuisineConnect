const express = require("express");
const isAuth = require("../middlewares/isAuth.js");

const {
    getRecipes,
    getRecipe,
    createRecipe,
    createManyRecipe,
    deleteRecipe,
    addReview,
} = require("../controllers/recipe.js");

const router = express.Router();

router.get("/", getRecipes);
router.get("/:recipeId", getRecipe);
router.post("/", createRecipe);
router.post("/many", createManyRecipe);
router.delete("/:recipeId", deleteRecipe);
router.post("/:recipeId/review",isAuth, addReview);


module.exports = router;
