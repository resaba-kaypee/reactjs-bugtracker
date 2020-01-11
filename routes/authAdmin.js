const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");
const Admin = require("../models/Admin");

// @route   GET api/authAdmin
// @desc    Get logged in admin
// @access  Private
router.get("/", async (req, res) => {
  res.send('Get logged in admin')
  // try {
  //   const admin = await Admin.findById(req.admin.id).select("-password");
  //   res.json(admin);
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("Server error");
  // }
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
  "/",
  // [
  //   check("email", "Please include a valid email").isEmail(),
  //   check("password", "Password is required").exists()
  // ],
  async (req, res) => {
    res.send("Log in admin")
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   const { email, password } = req.body;

  //   try {
  //     let user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(400).json({ msg: "Invalid Credentials" });
  //     }

  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(400).json({ msg: "Invalid Credentials" });
  //     }

  //     const payload = {
  //       user: {
  //         id: user.id
  //       }
  //     };

  //     jwt.sign(
  //       payload,
  //       config.get("jwtSecret"),
  //       {
  //         expiresIn: 360000
  //       },
  //       (err, token) => {
  //         if (err) throw err;
  //         res.json({ token });
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(500).send("Server error");
  //   }
  }
);

module.exports = router;
