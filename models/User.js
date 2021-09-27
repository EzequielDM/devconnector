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

const UserRules = {
    name: "required",
    email: "required|email",
    password: "required|min:8",
};

module.exports = { User, UserRules };
