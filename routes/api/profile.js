const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Validator = require("validatorjs");

const { User } = require("../../models/User");
const {
    Profile,
    ProfileRegisterRules,
    ProfileUpdateRules,
} = require("../../models/Profile");

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

// @route    POST api/profile
// @desc     Create user profile
// @access   Private
router.post("/", auth, async (req, res) => {
    let valid = new Validator(req.body, ProfileRegisterRules);
    if (!valid.passes()) {
        console.error(valid.errors);
        return res.status(400).json(valid.errors);
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        social,
    } = req.body;

    //#region Build profile fields obj
    const profileFields = {
        user: req.user.id,
    };

    company && (profileFields.company = company);
    website && (profileFields.website = website);
    location && (profileFields.location = location);
    bio && (profileFields.bio = bio);
    status && (profileFields.status = status);
    githubusername && (profileFields.githubusername = githubusername);
    skills &&
        (profileFields.skills = skills.split(",").map((skill) => skill.trim()));
    social && (profileFields.social = social);
    //#endregion

    try {
        let exists = await Profile.findOne({ user: req.user.id });

        if (exists) {
            return res.status(400).json({
                errors: [
                    {
                        user: "This profile already exists, you can't overwrite it, try using a PUT request to update it",
                    },
                ],
            });
        }

        const profile = new Profile(profileFields);

        await profile.save();

        return res.status(201).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }

    console.log(`profileFields`, profileFields);

    return res.send("Passed validation");
});

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put("/", auth, async (req, res) => {
    let valid = new Validator(req.body, ProfileRegisterRules);
    if (!valid.passes()) {
        console.error(valid.errors);
        return res.status(400).json(valid.errors);
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        social,
        experience,
        education,
    } = req.body;

    //#region Build profile fields obj
    const profileFields = {
        user: req.user.id,
    };

    company && (profileFields.company = company);
    website && (profileFields.website = website);
    location && (profileFields.location = location);
    bio && (profileFields.bio = bio);
    status && (profileFields.status = status);
    githubusername && (profileFields.githubusername = githubusername);
    skills &&
        (profileFields.skills = skills.split(",").map((skill) => skill.trim()));
    social && (profileFields.social = social);
    experience && (profileFields.experience = experience);
    education && (profileFields.education = education);
    //#endregion

    try {
        let exists = await Profile.findOne({ user: req.user.id });

        if (!exists)
            return res.status(404).json({
                errors: [
                    {
                        user: "Profile not found, have you created one yet?",
                    },
                ],
            });

        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        );

        return res.status(200).json(profile);
    } catch (e) {
        console.error(e.message);
        return res.status(500).send("Server error");
    }
});

// @route    GET api/profile
// @desc     Get all user profiles
// @access   Public
router.get("/", async (req, res) => {
    try {
        let profiles = await Profile.find().populate("user", [
            "name",
            "avatar",
        ]);

        return res.json(profiles);
    } catch (error) {
        console.error(error);
=======

const { User } = require("../../models/User");
const {
    Profile,
    ProfileRegisterRules,
    ProfileUpdateRules,
} = require("../../models/Profile");

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

// @route    GET api/profile/user/:id
// @desc     Get user profile by id
// @access   Public
router.get("/user/:id", async (req, res) => {
    try {
        let exist = await Profile.findOne({ user: req.params.id }).populate(
            "user",
            ["name", "avatar"]
        );

        if (!exist) {
            return res.status(404).json({
                errors: [{ id: "No profile found with that user id" }],
            });
        }

        return res.json(exist);
    } catch (error) {
        if (error.kind == "ObjectId")
            return res.status(404).json({
                errors: [{ id: "No profile found with that user id" }],
            });
        console.error(error.message);
        return res.status(500).send("Server error");
    }
});

// @route     DELETE api/profile/
// @desc      Delete own user profile
// @access    Private
router.delete("/", auth, async (req, res) => {
    try {
        let exist = await Profile.findOneAndDelete({ user: req.user.id });
        let exist2 = await User.findOneAndDelete({ id: req.user.id });

        if (!exist)
            return res.status(400).json({
                errors: {
                    id: "Profile not found, have you created one yet?",
                },
            });

        if (!exist2)
            return res.status(400).json({ errors: { id: "User not found" } });

        return res.json(exist);
    } catch (error) {
        console.error(error);
=======
// @route    POST api/profile
// @desc     Create user profile
// @access   Private
router.post("/", auth, async (req, res) => {
    let valid = new Validator(req.body, ProfileRegisterRules);
    if (!valid.passes()) {
        console.error(valid.errors);
        return res.status(400).json(valid.errors);
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        social,
    } = req.body;

    //#region Build profile fields obj
    const profileFields = {
        user: req.user.id,
    };

    company && (profileFields.company = company);
    website && (profileFields.website = website);
    location && (profileFields.location = location);
    bio && (profileFields.bio = bio);
    status && (profileFields.status = status);
    githubusername && (profileFields.githubusername = githubusername);
    skills &&
        (profileFields.skills = skills.split(",").map((skill) => skill.trim()));
    social && (profileFields.social = social);
    //#endregion

    try {
        let exists = await Profile.findOne({ user: req.user.id });

        if (exists) {
            return res.status(400).json({
                errors: [
                    {
                        user: "This profile already exists, you can't overwrite it, try using a PUT request to update it",
                    },
                ],
            });
        }

        const profile = new Profile(profileFields);

        await profile.save();

        return res.status(201).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }

    console.log(`profileFields`, profileFields);

    return res.send("Passed validation");
});

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put("/", auth, async (req, res) => {
    let valid = new Validator(req.body, ProfileRegisterRules);
    if (!valid.passes()) {
        console.error(valid.errors);
        return res.status(400).json(valid.errors);
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        social,
        experience,
        education,
    } = req.body;

    //#region Build profile fields obj
    const profileFields = {
        user: req.user.id,
    };

    company && (profileFields.company = company);
    website && (profileFields.website = website);
    location && (profileFields.location = location);
    bio && (profileFields.bio = bio);
    status && (profileFields.status = status);
    githubusername && (profileFields.githubusername = githubusername);
    skills &&
        (profileFields.skills = skills.split(",").map((skill) => skill.trim()));
    social && (profileFields.social = social);
    experience && (profileFields.experience = experience);
    education && (profileFields.education = education);
    //#endregion

    try {
        let exists = await Profile.findOne({ user: req.user.id });

        if (!exists)
            return res.status(404).json({
                errors: [
                    {
                        user: "Profile not found, have you created one yet?",
                    },
                ],
            });

        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        );

        return res.status(200).json(profile);
    } catch (e) {
        console.error(e.message);
        return res.status(500).send("Server error");
    }
});

module.exports = router;
