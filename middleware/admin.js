const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ errors: { message: ["Invalid auth token (empty)"] } });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || config.get("jwtSecret"));

    let exist = await User.findById(decoded.user.id);
    if (!exist)
      return res.status(401).json({
        errors: { message: ["Invalid auth token (user deleted)"] },
      });

    if (exist.role !== "admin")
      return res.status(403).json({ errors: { message: ["Unauthorized user"] } });

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: { message: ["Invalid auth token"] } });
  }
};
