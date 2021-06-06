const book = require("../controllers/book.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // routes

    app.post("/api/user/addbook", [authJwt.verifyToken], book.createBook);
}



