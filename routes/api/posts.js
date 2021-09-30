const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const checkID = require("../../middleware/checkID");
const Validator = require("validatorjs");
const mongoose = require("mongoose");
const { User } = require("../../models/User");
const { Post, PostRules, CommentRules } = require("../../models/Post");

/**
 * SECTION All routes related to post creation, editting, and deletion.
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

// @route       GET api/posts
// @desc        Returns all posts
// @access      Public
router.get("/all", auth, async (req, res) => {
    try {
        let posts = await Post.find();
        if (!posts)
            return res
                .status(404)
                .json({ errrors: [{ message: "No posts available" }] });

        return res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

// @route       DELETE api/posts/:id
// @desc        Delete user's post by id
// @access      Private
router.delete("/:id", auth, checkID("id"), async (req, res) => {
    try {
        let post = await Post.findByIdAndDelete(req.params.id);
        if (!post)
            return res.status(404).json({ errors: [{ id: "Post not found" }] });

        return res.json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

// @route       PUT api/posts/:id
// @desc        Edit user's post
// @access      Private
router.put("/:id", auth, checkID("id"), async (req, res) => {
    let valid = new Validator(req.body, PostRules);
    if (!valid.passes()) return res.status(400).json(valid.errors);

    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (!post)
            return res.status(404).json({ errors: [{ id: "Post not found" }] });

        post.text = req.body.text;

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

//#endregion

/**
 * !SECTION
 */

/**
 * SECTION All routes related to post likes handling
 */

//#region

// @route       POST api/posts/like/:id
// @desc        Adds a like to the specified post (user)
// @access      Private
router.post("/like/:id", auth, checkID("id"), async (req, res) => {
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
// @access      Admin
router.post("/like/:id/admin", admin, checkID("id"), async (req, res) => {
    try {
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

// @route       PUT api/posts/like/:id
// @desc        Unlikes the post (user)
// @access      Private
router.put("/like/:id", auth, checkID("id"), async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (!post)
            return res.status(404).json({ errors: [{ id: "Post not found" }] });

        if (!post.likes.some((like) => like.user.toString() === req.user.id))
            return res
                .status(400)
                .json({ errors: { id: "You haven't liked this post" } });

        const index = post.likes.map((item) => item.user).indexOf(req.user.id);

        post.likes.splice(index, 1);

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

// @route       PUT api/posts/like/:id/:like_id
// @desc        Unlikes the post forcefully (admin)
// @access      Admin
router.put(
    "/like/:id/:like_id",
    checkID("id", "like_id"),
    admin,
    async (req, res) => {
        try {
            const { id, like_id } = req.params;

            let post = await Post.findOne({ _id: id });
            if (!post)
                return res
                    .status(404)
                    .json({ errors: [{ id: "Post not found" }] });

            if (!post.likes.some((like) => like.id === like_id))
                return res
                    .status(400)
                    .json({ errors: { id: "Like not found, check like id" } });

            const index = post.likes.map((item) => item.id).indexOf(like_id);

            post.likes.splice(index, 1);

            await post.save();

            return res.json(post);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    }
);

// @route       DELETE api/posts/like/:id
// @desc        Wipes all likes from specified post
// @access      Admin
router.delete("/like/:id", admin, checkID("id"), async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (!post)
            return res.status(404).json({ errors: [{ id: "Post not found" }] });

        post.likes = [];

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

//#endregion

/**
 * !SECTION
 */

/**
 * SECTION All routes related to comment handling
 * @TODO: Post comment, edit comment, delete comment, get all comments on a post; (user)
 * @TODO: Edit comment by ID, delete a user comment by ID, sudo a user comment; (admin)
 */

//#region

// @route       POST api/posts/comment/:id
// @desc        Posts a comment under the specified post
// @access      Private
router.post("/comment/:id", auth, checkID("id"), async (req, res) => {
    let valid = new Validator(req.body, CommentRules);
    if (!valid.passes()) return res.status(400).json(valid.errors);

    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (!post)
            return res.status(404).json({ errors: [{ id: "Post not found" }] });

        let user = await User.findById(req.user.id);

        const { name, avatar } = user;

        let lastPost = post.comments
            .filter((item) => item.user == req.user.id)
            .splice(0, 1)[0];

        const cooldown = new Date(lastPost.date.getTime() + 15 * 1000);

        if (cooldown > Date.now())
            return res.status(400).json({
                errors: {
                    id: "You may only post a comment every 15 seconds.",
                },
            });

        post.comments.unshift({
            ...req.body,
            user: req.user.id,
            name,
            avatar,
        });

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

//#endregion

/**
 * !SECTION
 */

module.exports = router;
