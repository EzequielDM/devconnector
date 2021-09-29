const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/User");

module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token)
        return res
            .status(401)
            .json({ errors: [{ message: "Invalid auth token (empty)" }] });

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        let exist = await User.findById(decoded.user.id);
        if (!exist)
            return res
                .status(401)
                .json({
                    errors: [{ message: "Invalid auth token (user deleted)" }],
                });
      
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ errors: [{ message: "Invalid auth token" }] });
    }
};
