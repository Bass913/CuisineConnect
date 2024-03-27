const User = require("../models/user.js");

exports.getUserInfo = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addPreferences = async (req, res) => {
  try {
    const { dietaryPreferences } = req.body;
    if (!dietaryPreferences) return res.sendStatus(400);
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(404);
    user.dietaryPreferences.push(dietaryPreferences);
    await user.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while adding preferences: ${error}`,
    });
  }
};

exports.removePreferences = async (req, res) => {
  try {
    const { dietaryPreferences } = req.body;
    if (!dietaryPreferences) return res.sendStatus(400);
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(404);
    user.dietaryPreferences.pull(dietaryPreferences);
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while removing preferences: ${error}`,
    });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) return res.sendStatus(400);
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(404);
    const existingFavorite = user.favoriteRecipes.find(
      (favorite) => favorite.toString() === recipeId
    );
    if (existingFavorite) return res.sendStatus(409);
    user.favoriteRecipes.push(recipeId);
    await user.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while adding favorite: ${error}`,
    });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) return res.sendStatus(400);
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(404);
    const existingFavorite = user.favoriteRecipes.find(
      (favorite) => favorite.toString() === recipeId
    );
    if (!existingFavorite) return res.sendStatus(409);
    user.favoriteRecipes.pull(recipeId);
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while removing favorite: ${error}`,
    });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favoriteRecipes");
    if (!user) return res.sendStatus(404);
    res.status(200).json(user.favoriteRecipes);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while getting favorites: ${error}`,
    });
  }
};
