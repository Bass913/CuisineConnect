const express = require("express");
const isAuth = require("../middlewares/isAuth.js");

const {
  getRecipes,
  getRecipe,
  createRecipe,
  createManyRecipe,
  deleteRecipe,
  addReview,
  getAverageRating,
  getReviews,
} = require("../controllers/recipe.js");

const { recommendation } = require("../controllers/recommendation.js");

const router = express.Router();

router.get("/", getRecipes);
router.get("/:recipeId", getRecipe);
router.get("/:recipeId/recommendations", recommendation);
router.post("/", createRecipe);
router.post("/many", createManyRecipe);
router.delete("/:recipeId", deleteRecipe);
router.post("/:recipeId/review", isAuth, addReview);
router.get("/:recipeId/averageRating", getAverageRating);
router.get("/:recipeId/reviews", getReviews);

module.exports = router;
