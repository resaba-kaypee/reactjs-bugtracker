const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const adminAuth = require("../middleware/authAdmin")
const { check, validationResult } = require("express-validator");
const Admin = require("../models/Admin");

// @route   POST api/admin/register
// @desc    Register a admin
// @access  Private
router.post(
  "/register",
  // [
  //   check("name", "Please enter a name")
  //     .not()
  //     .isEmpty(),
  //   check("email", "Please include a valid email").isEmail(),
  //   check(
  //     "password",
  //     "Please enter a password with 6 or more characters"
  //   ).isLength({ min: 6 })
  // ],
  async (req, res) => {
    res.send("Admin registered")
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    // const { name, email, password } = req.body;

    // try {
    //   let admin = await Admin.findOne({ email });
    //   if (admin) {
    //     return res.status(400).json({ msg: "Admin already exists" });
    //   }

    //   admin = new Admin({
    //     name,
    //     email,
    //     password
    //   });

    //   const salt = await bcrypt.genSalt(10);
    //   admin.password = await bcrypt.hash(password, salt);

    //   await admin.save();

    //   const payload = {
    //     admin: {
    //       id: admin.id
    //     }
    //   };

    //   jwt.sign(
    //     payload,
    //     config.get("jwtSecret"),
    //     {
    //       expiresIn: 360000
    //     },
    //     (err, token) => {
    //       if (err) throw err;
    //       res.json({ token });
    //     }
    //   );
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send("Server error");
    // }
  }
);

module.exports = router;
