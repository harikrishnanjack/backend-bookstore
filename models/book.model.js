const mongoose = require("mongoose");
const { userSchema } = require("./user.model");

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
                type: [String],
                required: true
            },
            bookSynopsis: {
                type: String
            },
            adaptedTo: [{
                mediaForm: String,
                adaptedName: String,
                adaptedYear: Date
            }],
            coverImage: {
                data: Buffer,
                contentType: String
            }
        }
    )
);

module.exports = Book;