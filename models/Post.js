const mongoose = require("mongoose");

const PostRules = {
    user: "string",
    text: "required|string|min:12",
    name: "string",
    avatar: "string",
    "likes.*.user": "required|string",
    "likes.*.date": "date",
    "comments.*.user": "required|string",
    "comments.*.name": "string",
    "comments.*.avatar": "string",
    "comments.*.text": "required|string",
    "comments.*.date": "date",
};

const CommentRules = {
    user: "string",
    name: "string",
    avatar: "string",
    text: "required|string|between:8,150",
    date: "date",
};

const Post = mongoose.model(
    "post",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
        },
        text: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                name: {
                    type: String,
                },
                avatar: {
                    type: String,
                },
                text: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        date: {
            type: Date,
            default: Date.now,
        },
    })
);

module.exports = { Post, PostRules, CommentRules };
