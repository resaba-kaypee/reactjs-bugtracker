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
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      if (user.role !== role) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
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

      // const newLog = new Log({
      //   fistName: payload.user.firstName,
      //   lastName: payload.user.lastName,
      //   role: payload.user.role,
      //   action: "logged in",
      // })
      // await newLog.save();

    } catch (error) {
      console.error("fr auth user:", error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/auth
// @desc    Logout user
// @access  Public
router.get("/logout", auth, async (req, res) => {
  try {
    const newLog = await new Log({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      action: "logged out"
    });

    await newLog.save();
  } catch (err) {
    console.error("fr: logout", error.message);
  }
});

module.exports = router;
