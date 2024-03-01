const express = require("express");
const {
 getRecipes,
 getRecipe,
 createRecipe,
 createManyRecipe,
 updateRecipe,
 deleteRecipe,
} = require("../controllers/recipe.js");

const router = express.Router();

router.get("/", getRecipes);
router.get("/:recipeId", getRecipe);
router.post("/", createRecipe);
router.post("/many", createManyRecipe);
router.put("/:recipeId", updateRecipe);
router.delete("/:recipeId", deleteRecipe);

module.exports = router;
