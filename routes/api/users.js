const express = require("express");
const router = express.Router();
const Validator = require("validatorjs");
const { User, UserRules } = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", (req, res) => {
    let valid = new Validator(req.body, UserRules);
    if (!valid.passes()) {
        console.error(valid.errors);
        res.status(400).json(valid.errors);
        return;
    }

    res.send("User passed validation");
});

module.exports = router;
