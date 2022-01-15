const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const checkID = require("../../middleware/checkID");
const Validator = require("validatorjs");
const config = require("config");

const axios = require("axios");

const { User } = require("../../models/User");
const {
  Profile,
  ProfileRegisterRules,
  ProfileUpdateRules,
  ExperienceRules,
  EducationRules,
} = require("../../models/Profile");

/**
 * -- All routes related to a user's profile in general, including all basic HTTP methods.
 */
//#region User profile routes

// @route    GET api/profile/me
// @desc     Return user's profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", [
      "name",
      "avatar",
      "role",
    ]);

    if (!profile) {
      return res.status(404).json({ errors: { message: ["User not found"] } });
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

  const { company, website, location, bio, status, githubusername, skills, social } = req.body;

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
  skills && (profileFields.skills = skills.split(",").map((skill) => skill.trim()));
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
});

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put("/", auth, async (req, res) => {
  let valid = new Validator(req.body, ProfileUpdateRules);
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
  skills && (profileFields.skills = skills.split(",").map((skill) => skill.trim()));
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
    let profiles = await Profile.find().populate("user", ["name", "avatar", "role"]);

    return res.json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// @route    GET api/profile/:id
// @desc     Get user profile by id
// @access   Public
router.get("/:id", checkID("id"), async (req, res) => {
  try {
    let exist = await Profile.findOne({ user: req.params.id }).populate("user", [
      "name",
      "avatar",
      "role",
    ]);

    if (!exist) {
      return res.status(404).json({
        errors: { message: ["No profile found with that user id"] },
      });
    }

    return res.json(exist);
  } catch (error) {
    if (error.kind == "ObjectId")
      return res.status(404).json({
        errors: { message: ["No profile found with that user id"] },
      });
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

// @route     DELETE api/profile/
// @desc      Delete own user & profile
// @access    Private
router.delete("/", auth, async (req, res) => {
  try {
    let exist = await Profile.findOneAndDelete({ user: req.user.id });
    let exist2 = await User.findOneAndDelete({ _id: req.user.id });

    if (!exist)
      return res.status(400).json({
        errors: {
          id: "Profile not found, have you created one yet?",
        },
      });

    if (!exist2) return res.status(400).json({ errors: { id: "User not found" } });

    return res.json(exist);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// @route     PUT api/profile/:id
// @desc      Edit a user's profile
// @access    Admin
router.put("/edit/:id", admin, checkID("id"), async (req, res) => {
  let valid = new Validator(req.body, ProfileUpdateRules);
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
  const profileFields = {};

  company && (profileFields.company = company);
  website && (profileFields.website = website);
  location && (profileFields.location = location);
  bio && (profileFields.bio = bio);
  status && (profileFields.status = status);
  githubusername && (profileFields.githubusername = githubusername);
  skills && (profileFields.skills = skills.split(",").map((skill) => skill.trim()));
  social && (profileFields.social = social);
  experience && (profileFields.experience = experience);
  education && (profileFields.education = education);
  //#endregion

  try {
    let exists = await Profile.findOne({ user: req.params.id });

    if (!exists)
      return res.status(404).json({
        errors: {
          user: "Profile not found",
        },
      });

    let profile = await Profile.findOneAndUpdate(
      { user: req.params.id },
      { $set: { ...profileFields } },
      { new: true }
    );

    console.log(`Updated profile: ${profile}`);
    return res.status(200).json(profile);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server error");
  }
});

// @route     DELETE api/profile/:id
// @desc      Delete own user & profile
// @access    Private
router.delete("/:id", admin, checkID("id"), async (req, res) => {
  try {
    let admincheck = await User.findById(req.params.id);
    if (admincheck.role === "admin") return res.sendStatus(403);

    let exist = await Profile.findOneAndDelete({ user: req.params.id });
    let exist2 = await User.findOneAndDelete({ _id: req.params.id });

    if (!exist)
      return res.status(400).json({
        errors: {
          id: "Profile not found",
        },
      });

    if (!exist2) return res.status(400).json({ errors: { id: "User not found" } });

    return res.json(exist);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

//#endregion

/**
 * -- All routes related to Experience on a user's profile
 * ! @TODO: Probably I should change the PUT method to POST as it's adding something to an object
 * !   that works like a collection on Mongo, therefore, a POST request instead of PUT would make
 * !   more sense in this case.
 */
//#region Profile experience routes

// @route       PUT api/profile/experience
// @desc        Add experience to user profile
// @access      Private
router.put("/experience", auth, async (req, res) => {
  let valid = new Validator(req.body, ExperienceRules);
  if (!valid.passes()) return res.status(400).json(valid.errors);

  const { title, company, location, from, to, current, description } = req.body;

  //#region Build experienceFields obj
  const experienceFields = {};

  title && (experienceFields.title = title);
  company && (experienceFields.company = company);
  location && (experienceFields.location = location);
  from && (experienceFields.from = from);
  to && (experienceFields.to = to);
  current && (experienceFields.current = current);
  description && (experienceFields.description = description);
  //#endregion

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) return res.status(400).json({ errors: { auth: "Profile not found" } });

    profile.experience.unshift(experienceFields);

    await profile.save();

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// @route       DELETE api/profile/experience
// @desc        Wipes all experience currently available to user
// @access      Private
router.delete("/experience", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) return res.status(400).json({ errors: { id: "User not found" } });

    profile.experience = [];

    await profile.save();

    return res.json({ experience: profile.experience, msg: "Wiped" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route       DELETE api/profile/experience/:id
// @desc        Deletes a specific experienced based on _id
// @access      Private
router.delete("/experience/:id", auth, checkID("id"), async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    const index = profile.experience.map((item) => item.id).indexOf(req.params.id);

    if (index < 0) return res.status(400).json({ errors: { id: "Experience not found" } });

    profile.experience.splice(index, 1);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId")
      return res.status(400).json({ errors: { id: "Experience not found" } });
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route       PUT api/profile/experience/:id
// @desc        Edits a specific experienced based on _id
// @access      Private
router.put("/experience/:id", auth, checkID("id"), async (req, res) => {
  let valid = new Validator(req.body, ExperienceRules);
  if (!valid.passes()) return res.status(400).json(valid.errors);

  const { title, company, location, from, to, current, description } = req.body;

  //#region Build experienceFields obj
  const experienceFields = {};

  title && (experienceFields.title = title);
  company && (experienceFields.company = company);
  location && (experienceFields.location = location);
  from && (experienceFields.from = from);
  to && (experienceFields.to = to);
  current && (experienceFields.current = current);
  description && (experienceFields.description = description);
  //#endregion

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) return res.status(400).json({ errors: { auth: "Profile not found" } });

    const index = profile.experience.map((exp) => exp._id.toString()).indexOf(req.params.id);
    if (index < 0) return res.status(404).json({ errors: { experience: "Experience not found" } });

    console.log(`index`, index);

    profile.experience[index] = experienceFields;

    await profile.save();

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

//#endregion

/**
 * -- All routes related to Education on a user's profile
 * ! @TODO: Probably I should change the PUT method to POST here too, same as with experiences.
 */
//#region Profile education routes
// @route       PUT api/profile/education
// @desc        Add education to user profile
// @access      Private
router.put("/education", auth, async (req, res) => {
  let valid = new Validator(req.body, EducationRules);
  if (!valid.passes()) return res.status(400).json(valid.errors);

  const { school, degree, field, from, to, current, description } = req.body;

  //#region Build experienceFields obj
  const educationFields = {};

  school && (educationFields.school = school);
  degree && (educationFields.degree = degree);
  field && (educationFields.field = field);
  from && (educationFields.from = from);
  to && (educationFields.to = to);
  current && (educationFields.current = current);
  description && (educationFields.description = description);
  //#endregion

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) return res.status(400).json({ errors: { auth: "Profile not found" } });

    profile.education.unshift(educationFields);

    await profile.save();

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// @route       DELETE api/profile/experience
// @desc        Wipes all experience currently available to user
// @access      Private
router.delete("/education", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) return res.status(400).json({ errors: { id: "User not found" } });

    profile.education = [];

    await profile.save();

    return res.json({ education: profile.education, msg: "Wiped" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route       DELETE api/profile/experience/:id
// @desc        Deletes a specific experienced based on _id
// @access      Private
router.delete("/education/:id", auth, checkID("id"), async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    const index = profile.education.map((item) => item.id).indexOf(req.params.id);

    if (index < 0) return res.status(400).json({ errors: { id: "Education not found" } });

    profile.education.splice(index, 1);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route       PUT api/profile/education/:id
// @desc        Edits a specific education based on _id
// @access      Private
router.put("/education/:id", auth, checkID("id"), async (req, res) => {
  let valid = new Validator(req.body, EducationRules);
  if (!valid.passes()) return res.status(400).json(valid.errors);

  const { school, degree, field, from, to, current, description } = req.body;

  //#region Build educationFields obj
  const educationFields = {};

  school && (educationFields.school = school);
  degree && (educationFields.degree = degree);
  field && (educationFields.field = field);
  from && (educationFields.from = from);
  to && (educationFields.to = to);
  current && (educationFields.current = current);
  description && (educationFields.description = description);
  //#endregion

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) return res.status(400).json({ errors: { auth: "Profile not found" } });

    const index = profile.education.map((exp) => exp._id.toString()).indexOf(req.params.id);
    if (index < 0) return res.status(404).json({ errors: { education: "Education not found" } });

    console.log(`index`, index);

    profile.education[index] = educationFields;

    await profile.save();

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
//#endregion

/**
 * -- Github API Integration
 */
//#region Github API Integration
// @route       GET api/profile/github/:username
// @desc        Return a users repositories from Github API.
// @access      Public
router.get("/github/:username", async (req, res) => {
  const options = {
    uri: encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    ),
    headers: {
      "user-agent": "node.js",
      Authorization: `token ${process.env.GITHUB_PAT || config.get("githubPAT")}`,
    },
  };

  try {
    let github = await axios.get(options.uri, options.headers);
    if (!github) return res.status(400).json({ errors: { api: "Github API: Invalid user" } });

    return res.json(github.data);
  } catch (err) {
    if (err.response) return res.status(404).json(err.response.data);
    if (err.request)
      return res.status(408).json({ GithubAPI: "Request timed out. Is GitHub down?" });
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
