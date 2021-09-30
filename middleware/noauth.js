module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (token) return res.status(403).send("You're already logged in");

    next();
};
