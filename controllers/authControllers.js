const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../routes/validation");
// const jwt = require("jsonwebtoken");
// const initialize = require("../config/passport-conf");
// const passport = require("passport");
// const res = require("express/lib/response");

const getRegisterPage = async (req, res) => {
  try {
    res.render("../views/register.ejs");
  } catch (err) {
    res.status(400).send(err);
  }
};

const createUser = async (req, res) => {
  console.log(req.body);

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) return res.status(400).send("Email already registered.");

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  // Check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found.");

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  // passport

  // Create and assign token
  // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // res.header("auth-token", token).send(token);

  res.redirect("/favorites");
};

module.exports = {
  createUser,
  login,
  getRegisterPage,
};
