const mongoose = require("mongoose");

const checkID =
    (...id) =>
    (req, res, next) => {
        for (let i in id)
            if (!mongoose.Types.ObjectId.isValid(req.params[id[i]]))
                return res
                    .status(400)
                    .json({ errors: [{ id: `Invalid ${id[i]}` }] });

        next();
    };

module.exports = checkID;
