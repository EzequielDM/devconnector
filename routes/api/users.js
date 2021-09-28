const express = require("express");
const router = express.Router();
const Validator = require("validatorjs");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User, UserRules: UserRegisterRules } = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", async (req, res) => {
    let valid = new Validator(req.body, UserRegisterRules);
    if (!valid.passes()) {
        console.error(valid.errors);
        return res.status(400).json(valid.errors);
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                errors: {
                    email: ["This user is already registered"],
                },
            });
        }

        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
        });

        user = new User({
            name,
            email,
            avatar,
            password,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
                // @FIXME This should be 3600 in production!
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
