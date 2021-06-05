const mongoose = require("mongoose");

const Book = mongoose.model(
    "Book",
    new mongoose.Schema(
        {
            bookName: {
                type: String,
                required: true,
                unique: true
            },
            bookAuthor: {
                type: String,
                required: true
            },
            publishYear: {
                type: Date
            },
            bookGenre: {
                type: String,
                required: true
            },
            bookRating: {
                type: Number
            },
            adaptedTo: [{
                mediaForm: String,
                adaptedName: String,
                adaptedYear: Date
            }],
            readDuration: {
                type: String
            },
            readerNos: {
                type: Number
            },
            coverImage: {
                data: Buffer,
                contentType: String
            }
        }
    )
);

module.exports = Book;