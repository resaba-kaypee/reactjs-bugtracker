const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const Log = require("../models/Log");

// @route   POST api/issues
// @desc    Add new issue
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("action", "Action is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { action, date } = req.body;

    try {
      const newLog = new Log({
        action,
        date
      });

      await newLog.save();
      res.json(newLog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;