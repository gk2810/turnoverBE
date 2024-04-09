const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token || token == "null") {
            return res.status(401).json({ msg: "Invalid Authorization header", status: false })
        }
        token = token.split(" ")[1];
        let isVerfied = jwt.verify(token, process.env.JWT_SECRET)
        if (!isVerfied) {
            return res.status(401).json({ msg: "Invalid Authorization header", status: false })
        }
        req.user = isVerfied;
        next();
    } catch (error) {
        console.log("error :_", error);
        return res.status(500).json({ msg: "Something went wrong", status: false })
    }
}