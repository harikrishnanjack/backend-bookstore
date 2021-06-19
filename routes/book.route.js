const book = require("../controllers/book.controller");
const authJwt = require("../middlewares/authJwt");
const upload = require("../middlewares/upload");

const multer = require('multer');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // routes

    // create book route
    app.post("/api/user/addbook", [authJwt.verifyToken], book.createBook);

    // update book route
    app.put("/api/user/book/:bookId", [authJwt.verifyToken], book.updateBook);

    // delete book route
    app.delete("/api/user/book/:bookId", [authJwt.verifyToken], book.deleteBook);

    // get book by id route
    app.get("/api/user/book/:bookId", [authJwt.verifyToken], book.getBookById);

    // get all books route
    app.get("/api/user/book/", book.getAllBooks);

    // image upload
    app.post("/api/user/single", upload.single("image"), (req, res) => {
        console.log(req.file);
        res.send("File Uploaded Successfully");
    });
}



