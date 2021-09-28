const mongoose = require("mongoose");

const ProfileRegisterRules = {
    company: "string",
    website: "string",
    location: "string",
    status: "required|string",
    skills: "string|required",
    bio: "string",
    githubusername: "string",

    "experience.*.title": "required|string",
    "experience.*.company": "required|string",
    "experience.*.location": "string",
    "experience.*.from": "required|date",
    "experience.*.to": "date",
    "experience.*.current": "boolean",
    "experience.*.description": "string",

    "education.*.school": "required|string",
    "education.*.degree": "required|string",
    "education.*.field": "required|string",
    "education.*.from": "required|date",
    "education.*.to": "date",
    "education.*.current": "boolean",
    "education.*.description": "string",
    social: {
        youtube: "url",
        twitter: "url",
        facebook: "url",
        linkedin: "url",
        instagram: "url",
    },
    date: "date",
};

const ProfileUpdateRules = {
    company: "string",
    website: "string",
    location: "string",
    status: "string",
    skills: "string",
    bio: "string",
    githubusername: "string",

    "experience.*.title": "string",
    "experience.*.company": "string",
    "experience.*.location": "string",
    "experience.*.from": "date",
    "experience.*.to": "date",
    "experience.*.current": "boolean",
    "experience.*.description": "string",

    "education.*.school": "string",
    "education.*.degree": "string",
    "education.*.field": "string",
    "education.*.from": "date",
    "education.*.to": "date",
    "education.*.current": "boolean",
    "education.*.description": "string",
    social: {
        youtube: "url",
        twitter: "url",
        facebook: "url",
        linkedin: "url",
        instagram: "url",
    },
};

const Profile = mongoose.model(
    "profile",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        company: {
            type: String,
        },
        website: {
            type: String,
        },
        location: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        bio: {
            type: String,
        },
        githubusername: {
            type: String,
        },
        experience: [
            {
                title: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                location: {
                    type: String,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
            },
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    required: true,
                },
                field: {
                    type: String,
                    required: true,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
            },
        ],
        social: {
            youtube: { type: String },
            twitter: { type: String },
            facebook: { type: String },
            linkedin: { type: String },
            instagram: { type: String },
        },
        date: {
            type: Date,
            default: Date.now,
        },
    })
);

module.exports = { Profile, ProfileRegisterRules, ProfileUpdateRules };
