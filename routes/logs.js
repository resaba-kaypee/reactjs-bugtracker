// protect get logs

const express = require("express");
const router = express.Router();

const Log = require("../models/Log");

// @route   GET api/logs
// @desc    Get all users logs
// @access  Private
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find({}).sort({
      date: -1
    });
    res.json(logs);
  } catch (error) {
    console.error("fr: get all user logs", error.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;