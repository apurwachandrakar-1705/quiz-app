require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;

// Register the user
router.post("/register", async (req, res) => {
  try {
    let user = await new User({
      username: req.body.username,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
    });

    const token = jwt.sign({id:user._id, userName: user.username }, secret, {
      expiresIn: "1d",
    });

    if (!user) {
      res.status(400).json({ msg: "Unable to add user" });
    }

    user = await user.save();
    return res.status(200).json({
      msg: "Login successful",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.errors });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    const password = req.body.password;

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      // Incorrect email or password
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Generate a JWT token after successful login
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secret, // Your secret key for signing the token
      { expiresIn: "1d" } // Token expiration time
    );

    // Return the token and user details in the response
    return res.status(200).json({
      msg: "Login successful",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
