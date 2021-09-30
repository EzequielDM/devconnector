const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Validator = require("validatorjs");
const mongoose = require("mongoose");
const { User } = require("../../models/User");
const { Post, PostRules } = require("../../models/Post");

/**
 * SECTION All routes related to post creation, editting, and deletion.
 * @TODO: Add a route for deleting posts and editting them.
 */

//#region

// @route       POST api/posts
// @desc        Add a post to the list of posts
// @access      Private
router.post("/", auth, async (req, res) => {
    let valid = new Validator(req.body, PostRules);
    if (!valid.passes()) return res.status(400).json(valid.errors);

    try {
        let user = await User.findById(req.user.id);

        if (!user)
            return res.status(400).json({ errors: { id: "Invalid user" } });

        let postData = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        };

        const post = new Post(postData);

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

// @route       GET api/posts
// @desc        Returns all posts from the current user
// @access      Private
router.get("/", auth, async (req, res) => {
    try {
        let posts = await Post.find({ user: req.user.id });
        if (!posts)
            return res
                .status(404)
                .json({ errors: [{ message: "User has no comments" }] });

        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

//#endregion

/**
 * !SECTION
 */

/**
 * SECTION All routes related to post likes handling
 * @TODO: Add a route for liking a post, disliking a post and adding ghost likes (admin)
 */

//#region

// @route       POST api/posts/like/:id
// @desc        Adds a like to the specified post (user)
// @access      Private
router.post("/like/:id", auth, async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (!post)
            return res.status(404).json({ errors: [{ id: "Post not found" }] });

        if (post.likes.some((like) => like.user.toString() === req.user.id))
            return res
                .status(400)
                .json({ errors: [{ id: "You already liked this post" }] });

        post.likes.unshift({ user: req.user.id });

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

// @route       POST api/posts/like/:id/admin
// @desc        Adds a ghost like (admin)
// @access      Private
router.post("/like/:id/admin", auth, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (user.role !== "admin") return res.status(403).send("Unauthorized");

        let post = await Post.findOne({ _id: req.params.id });
        if (!post)
            return res.status(404).json({ errors: [{ id: "Post not found" }] });

        post.likes.unshift({ user: new mongoose.Types.ObjectId() });

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

//#endregion

module.exports = router;
