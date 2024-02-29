const express = require("express");
const { register, login, verify, logout } = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.get("/verify/:token", verify);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
