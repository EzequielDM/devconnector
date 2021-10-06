const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Validator = require("validatorjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const noauth = require("../../middleware/noauth");
const { User, UserLoginRules } = require("../../models/User");

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc Authenticate user & get JWT
// @access Public
router.post("/", noauth, async (req, res) => {
  let valid = new Validator(req.body, UserLoginRules);
  if (!valid.passes()) {
    console.error(valid.errors);
    return res.status(400).json(valid.errors);
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    const isMatch = user && (await bcrypt.compare(password, user.password));
    if (!user || !isMatch) {
      return res
        .status(400)
        .json({ errors: { message: ["Invalid credentials"] } });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
