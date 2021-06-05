const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;


exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User Already Exist' });
    }
    user = new User({
      name,
      email,
      password
    })
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
    console.error(err.message)
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
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
    const user = await User.findById(req.params.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}