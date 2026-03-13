const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }

});

router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });

 } catch (err) {
  console.log(err);
  res.status(500).json({ message: "Registration failed" });
}
});

module.exports = router;