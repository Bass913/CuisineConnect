const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/auth.js");

const {
  addPreferences,
  removePreferences,
  addFavorite,
  removeFavorite
} = require("../controllers/user.js");


const router = express.Router();

router.get("/:userId", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/preferences", addPreferences);
router.delete("/preferences", removePreferences);
router.post("/favorites", addFavorite);
router.delete("/favorites", removeFavorite);

module.exports = router;
