const db = require("../models");
const Book = db.book;

// services to create, edit, delete, get book reviews

/**
 * Add Book Details
 * 
 * @description Initial adding of book along with review of user who adds it
 * @param {Object} _bookData 
 * @returns 
 */

exports.addBookService = async (_bookData) => {
    const bookData = new Book(_bookData);
    return await bookData.save();
};

/**
 * Update book details
 * 
 * @service updateBookService
 * @description update book entries made initially
 * @param {Object} _bookData
 * @param {String} bookId
 * @return {Promise}
 */

exports.updateBookService = async (bookId,_bookData) => {
    const bookData = new Book(_bookData);
    return await bookData.updateOne({ _id: bookId }, bookData);
}


/**
 * Delete book details
 * 
 * @service deleteBookService
 * @description delete details of a book entirely
 * @param {String} bookId
 * @return {Promise}
 */

exports.deleteBookService = async (bookId) => {
    return await Book.deleteOne({ _id: bookId });
}

/**
 * Get book details by id
 * 
 * @service getBookByIdService
 * @description get book details by book id
 * @param {String} bookId
 * @return {Promise}
 */

exports.getBookByIdService = async (bookId) => {
    return await Book.findById(bookId);
}

/**
 * Get all books
 * 
 * @service getAllBooksService
 * @description get all books
 * @return {Promise}
 */

exports.getAllBooksService = async () => {
    return await Book.find({});
}