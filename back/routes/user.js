const express = require("express");

const isAuth = require("../middlewares/isAuth.js");

const {
  addPreferences,
  removePreferences,
  addFavorite,
  removeFavorite,
  getUserFavorites,
  getUserInfo,
} = require("../controllers/user.js");

const router = express.Router();

router.get("/me", isAuth, getUserInfo);

router.post("/preferences", addPreferences);
router.delete("/preferences", removePreferences);
router.post("/favorite", isAuth, addFavorite);
router.delete("/favorite", isAuth, removeFavorite);
router.get("/favorite", isAuth, getUserFavorites);

module.exports = router;
