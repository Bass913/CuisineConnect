const express = require("express");

const isAuth = require("../middlewares/isAuth.js");

const {
  addPreferences,
  removePreferences,
  addFavorite,
  removeFavorite,
  getUserInfo,
} = require("../controllers/user.js");

const router = express.Router();

router.get("/me", isAuth, getUserInfo);

router.post("/preferences", addPreferences);
router.delete("/preferences", removePreferences);
router.post("/favorites", addFavorite);
router.delete("/favorites", removeFavorite);

module.exports = router;
