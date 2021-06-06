const userService = require("../services/user.service");
const bookService = require("../services/book.service");

exports.createBook = async (req, res) => {
    try {
        const userData = await userService.getUserById(req.userId);
        console.log(req.userId);
        console.log(userData);

        const bookData = {
            addedBy: userData,
            bookName: req.body.bookName,
            bookAuthor: req.body.bookAuthor,
            publishYear: req.body.publishYear,
            bookGenre: req.body.bookGenre,
            bookSynopsis: req.body.bookSynopsis,
            adaptedTo: req.body.adaptedTo,
            coverImage: req.body.coverImage
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