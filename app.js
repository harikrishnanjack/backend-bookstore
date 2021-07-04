require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

//mongoose connection

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.')
  } else {
    console.log('Error in DB connection: ' + err)
  }
});



app.get("/", (req, res) => {
  res.json({ message: "Welcome to server" });
});

//root for routes

require('./routes/user.route')(app)
require('./routes/book.route')(app)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
