const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const userService = require("../services/user.service");
const { registerSchema, loginSchema } = require('../helpers/validation_helpers');
const {emailProcessor} = require('../helpers/email_helpers');




const User = db.user;
const verificationURL = "http://localhost:4000/verification/";


exports.registerUser = async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    const result = await registerSchema.validateAsync(req.body)

    let userEmail = await User.findOne({ email:result.email })
    let userName = await User.findOne({ username :result.username})
    if (userEmail) {
      return res.status(400).json({ message: 'User Already Exist' });
    }
    if (userName) {
      return res.status(400).json({ message: 'User Name already exist' });
    }

    user = new User(result)
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    await emailProcessor({
      email: result.email,
      type: "new-user-confirmation-required",
      verificationLink: verificationURL + user.id + "/" + result.email,
    });

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ message: "User Created", token });
    })

  } catch (err) {
    let message =
      "Unable to create new user at the moment, Please try agin or contact administration!";
    if (err.message.includes("duplicate key error collection")) {
      message = "this email already has an account";
    }
    if (err.isJoi === true) {
      return res.json({
        error: err.message
      })
    }
    console.error(err.message)
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.verifyUser = async (req, res) => {
  try {
    const { _id, email } = req.body;

    const result = await User.findOneAndUpdate(
      { _id, email, isVerified: false },
      {
        $set: { isVerified: true },
      },
      { new: true }
    ).catch((error) => {
      console.log(error.message);
    });

    if (result && result.id) {
      return res.json({
        status: "success",
        message: "You account has been activated, you may sign in now.",
      });
    }
    return res.json({
      status: "error",
      message: "Invalid request!",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Invalid request!",
    });
  }
}



exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginSchema.validateAsync(req.body)
    let user = await User.findOne({ email: result.email })
    if (!user.isVerified) {
      return res.json({
        status: "error",
        message:
          "You account has not been verified. Please check your email and verify you account before able to login!",
      });
    }
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ message: "User Logged in", token ,user});
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.getUser = async (req, res) => {
  try {
    const userData = await userService.getUserById(req.params.id);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}
