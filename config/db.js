const mongoose = require("mongoose");
const config = require("config");
const db = process.env.MONGO_URI || config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected successfully");
  } catch (e) {
    console.error(e.message);
    process.exit(1); // Exit process with code 1 (FAILURE)
  }
};

module.exports = connectDB;
