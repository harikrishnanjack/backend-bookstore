const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const userService = require("../services/user.service");
const { registerSchema, loginSchema } = require('../helpers/validation_helpers');


const User = db.user;


exports.registerUser = async (req, res) => {
  const { password } = req.body;
  try {
    const result = await registerSchema.validateAsync(req.body)
    let userEmail = await User.findOne({ email: result.email })
    let userName = await User.findOne({ userName: result.username })
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
    if (err.isJoi === true) {
      return res.json({
        error: err.message
      })
    }
    console.error(err.message)
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const result = await loginSchema.validateAsync(req.body)
    let user = await User.findOne({ email: result.email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(result.password, user.password);
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
      res.status(200).json({ message: "User Logged in", token });
    })
  } catch (err) {
    if (err.isJoi === true) {
      return res.json({
        error: err.message
      })
    }
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