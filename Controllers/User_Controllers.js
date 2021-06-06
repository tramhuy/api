const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const User = require("../Model/User");

module.exports = {
  REGISTER: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      const doseExists = await User.findOne({ email: email });
      if (doseExists) return res.status(400).json({ message: 'tài khoản này tồn tại' });
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password: passwordHash,
      })
      const results = await newUser.save();
      res.status(200).json({
        user: results
      })
    } catch (error) {
      console.log(error)
    }
  },
  LOGIN: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) return res.status(400).json({ message: ' Tài khoản này không tồn tại' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không đúng' });
      const userResult = await User.findById(user._id);
      const accessToken = signAccessToken({ email: email });
      res.status(200).json({
        user: userResult,
        token: accessToken
      })
    } catch (error) {
      console.log(error)
    }
  },
  PROFILE: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) return;
      const { email } = authorization(token);
      const user = await User.findOne({ email: email }, { password: 0 });
      const accessToken = signAccessToken({ email: email });
      res.status(200).json({
        user: user,
        token: accessToken
      })
    } catch (error) {
      console.log(error)
    }
  }
};
const {
  ACTIVATION_TOKEN_SECRET
} = process.env;
const signAccessToken = (payload) => {
  return JWT.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: '30d' });
};
const authorization = (payload) => {
  return JWT.verify(payload, ACTIVATION_TOKEN_SECRET);
};