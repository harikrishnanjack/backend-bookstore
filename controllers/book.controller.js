const userService = require("../services/user.service");
const bookService = require("../services/book.service");
const { bookSchema } = require("../helpers/validation_helpers");
const multer = require("multer");

exports.createBook = async (req, res) => {
    try {
        const result = await bookSchema.validateAsync(req.body);
        const userData = await userService.getUserById(req.user.id);
        const bookData = {
            addedBy: req.user.id,
            bookName: result.bookName,
            bookAuthor: result.bookAuthor,
            publishYear: result.publishYear,
            bookGenre: result.bookGenre,
            bookSynopsis: result.bookSynopsis,
            adaptedTo: result.adaptedTo,
        };
        console.log(bookData);
        const response = await bookService.addBook(bookData);
        res.status(200).json("New book added to database!");
    } catch(err) {
        if (err.name == "ValidationError") {
            console.log("Validation Error!");
            res.status(500).send(err.message);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

