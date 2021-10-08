const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      default: "user",
    },
  })
);

const UserRegisterRules = {
  name: "required|min:4",
  email: "required|email",
  password: "required|min:8",
};

const UserLoginRules = {
  email: "required|email",
  password: "required|string",
};

module.exports = { User, UserRegisterRules, UserLoginRules };
