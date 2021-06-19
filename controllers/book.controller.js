const userService = require("../services/user.service");
const bookService = require("../services/book.service");
const { bookSchema } = require("../helpers/validation_helpers");
const multer = require("multer");

/**
 * Create Book controller
 * 
 * @description create a book entry by user excluding user's review
 * @param {*} req 
 * @param {*} res 
 * @return {Promise}
 */

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

/**
 * Update Book
 * 
 * @description updating book details entry
 * @param {*} req 
 * @param {*} res 
 * @returns {Promise}
 */

exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const result = await bookSchema.validateAsync(req.body);
        const existingBookData = await bookService.getBookByIdService(bookId);
        const updateData = {
            bookName: result.bookName || existingBookData.bookName,
            bookAuthor: result.bookAuthor || existingBookData.bookAuthor,
            publishYear: result.publishYear || existingBookData.publishYear,
            bookGenre: result.bookGenre || existingBookData.bookGenre,
            bookSynopsis: result.bookSynopsis || existingBookData.bookSynopsis,
            adaptedTo: result.adaptedTo || existingBookData.adaptedTo,
        };

        const response = await bookService.updateBookService(bookId, updateData);
        res.status(200).send({
            msg: "Book Updated Successfully",
            data: updateData
        })
    } catch(err) {
        console.log(err);
    }
}

/**
 * Delete Book
 * 
 * @description delete book details by id
 * @param {*} req 
 * @param {*} res 
 * @returns {Promise}
 */

exports.deleteBook = async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const response = await bookService.deleteBookService(bookId);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/**
 * Get Book By Id
 * 
 * @description Get Book details by book id
 * @param {*} req 
 * @param {*} res
 * @returns {Promise} 
 */

exports.getBookById = async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const response = await bookService.getBookByIdService(bookId);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/**
 * Get All Books
 * 
 * @description Get All books and their details
 * @param {*} req 
 * @param {*} res
 * @returns {Promise} 
 */

exports.getAllBooks = async (req, res) => {
    try {
        const response = await bookService.getAllBooksService();
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}