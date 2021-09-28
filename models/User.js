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
    })
);

const UserRegisterRules = {
    name: "required",
    email: "required|email",
    password: "required|min:8",
};

const UserLoginRules = {
    email: "required|email",
    password: "required|string",
};

module.exports = { User, UserRegisterRules, UserLoginRules };
