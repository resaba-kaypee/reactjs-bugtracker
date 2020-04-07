const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const Log = require("../models/Log");

const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("fr: get logged in user", error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Auth user to login and get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Email" });
      }

      if (user.role !== role) {
        return res.status(400).json({ msg: "Unauthorized: Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Password" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // Log user action
      const newLog = new Log({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        action: "logged in"
      });
      
      await newLog.save();
    } catch (error) {
      console.error("fr auth user:", error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
