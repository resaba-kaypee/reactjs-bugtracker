const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authAdmin = require("../middleware/authAdmin")
const auth = require("../middleware/auth")

const { check, validationResult } = require("express-validator");
const Admin = require("../models/Admin");

// @route   GET api/authAdmin
// @desc    Get logged in admin
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("fr: get logged in admin", error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/authAdmin
// @desc    Auth admin and get token
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
      let user = await User.find({ email, role });
      if (!user && user.role !== "admin") {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
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
    } catch (error) {
      console.error("fr: auth admin", error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
