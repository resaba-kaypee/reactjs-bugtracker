const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Issue = require("../models/Issue");

// @route   GET api/issues
// @desc    Get all users issue
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const issues = await Issue.find({}).sort({
      date: -1
    });
    res.json(issues);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/issues
// @desc    Add new issue
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("description", "Description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, severity, status, assignedTo } = req.body;

    try {
      const newIssue = new Issue({
        description,
        severity,
        status,
        assignedTo,
        user: req.user.id
        
      });

      const issue = await newIssue.save();
      res.json(issue);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/issues/:id
// @desc    Update issue
// @access  Public
router.put("/:id", (req, res) => {
  res.send("Update issue");
});

// @route   DELETE api/issues/:id
// @desc    Delete issue
// @access  Public
router.delete("/:id", (req, res) => {
  res.send("Delete issue");
});

module.exports = router;
