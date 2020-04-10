const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Log = require("../models/Log");
const auth = require("../middleware/auth")

// @route   POST api/auth
// @desc    Logout user
// @access  Private
router.get("/logout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    cookie = req.cookies;
    for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
        continue;
      }
      res.cookie(prop, "", { expires: new Date(1) });
    }
    res.send("logged out");

    // Log user action when logging out
    const newLog = new Log({
      firstName: user.firstName,
      lastName: user.lastName,
      action: "logged out"
    });

    await newLog.save();
  } catch (err) {
    console.error("fr: logout", err.message);
  }
});

module.exports = router;
