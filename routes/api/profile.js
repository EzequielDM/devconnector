const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { User } = require("../../models/User");
const { Profile } = require("../../models/Profile");

// @route    GET api/profile/me
// @desc     Return user's profile
// @access   Private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            "user",
            ["name", "avatar"]
        );

        if (!profile) {
            return res
                .status(404)
                .json({ errors: [{ message: "User not found" }] });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

module.exports = router;
