const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.book = require("./book.model");

module.exports = db;