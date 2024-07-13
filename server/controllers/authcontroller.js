const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/usersmodel");
const secretKey = "secret-key";

// Signup a new user
const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    usertype,
    phone,
    postoffice,
    city,
    street,
    pincode,
    state,
  } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
      usertype,
      phone,
      postoffice,
      city,
      street,
      state,
      pincode,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      secretKey,
      { expiresIn: "1h" }
    );
    if (!newUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "Email not registered" });
    }
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secretKey,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      result: existingUser,
      token,
      usertype: existingUser.usertype,
      id: existingUser._id,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};

module.exports = {
  login,
  signup,
};
