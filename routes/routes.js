const router = require("express").Router();
const { registerValidation, loginValidation } = require("./validation");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { readlink } = require("fs");
const User = require("../models/User");
const authController = require("../controllers/authControllers.js");
const favoritesController = require("../controllers/favoritesControllers");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/register", authController.getRegisterPage);
router.post("/register", authController.createUser);
router.post("/login", authController.login);
router.get("/favorites", favoritesController.getFavorites);

module.exports = router;
