const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No Token Provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        console.log(req._id);
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid"});
    }
};

const authJwt = {
    verifyToken
};

module.exports = authJwt;