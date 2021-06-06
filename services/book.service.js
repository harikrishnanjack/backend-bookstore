const db = require("../models");
const Book = db.book;

// services to create, edit, delete, get book reviews

// Initial adding of book along with review of user who adds it
exports.addBook = async (_bookData) => {
    const bookData = new Book(_bookData);
    return await bookData.save();
};

