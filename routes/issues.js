const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const uuid = require("uuid");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Issue = require("../models/Issue");
const Log = require("../models/Log")

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
    console.error("fr: get all issue", error.message);
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

    const { projectName, description, priority, status, tech, date } = req.body;

    try {
      const newIssue = new Issue({
        user: req.user.id,
        projectName,
        description,
        priority,
        status,
        tech,
        date
      });

      const issue = await newIssue.save();

      // const newLog = new Log({
      //   username: req.user.name,
      //   action: "added new issue",
      // })
  
      // await newLog.save();

      res.json(issue);
    } catch (error) {
      console.error("fr: add new issue", error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/issues/:id
// @desc    Update issue
// @access  Public
router.put("/:id", auth, async (req, res) => {
  const { description, priority, status, tech, date } = req.body;

  // Build issue object
  const issueFields = {};
  if (description) issueFields.description = description;
  if (status) issueFields.status = status;
  if (priority) issueFields.priority = priority;
  if (tech) issueFields.tech = tech;
  if (date) issueFields.date = date;

  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    // Make sure user owns issue
    // if (issue.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $set: issueFields },
      { new: true }
    );

    // const newLog = new Log({
    //   username: req.user.name,
    //   action: "updated issue",
    // })

    // await newLog.save();

    res.json(issue);
  } catch (err) {
    console.error("fr: update issue", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/issues/:id
// @desc    Add comment to issue
// @access  Public
router.put("/comment/:id", auth, async (req, res) => {
  const { message, tech } = req.body;

  // Build issue object
  const commentFields = {};
  commentFields._id = uuid.v4();
  if (message) commentFields.message = message;
  if (tech) commentFields.tech = tech;

  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: commentFields } },
      { new: true }
    );

    res.json(issue);
  } catch (err) {
    console.error("fr: admin update issue", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/issues/:id
// @desc    Delete issue
// @access  Public
router.delete("/:id", auth, async (req, res) => {
  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    // Make sure user owns issue
    // if (issue.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    await Issue.findByIdAndRemove(req.params.id);

    const newLog = new Log({
      username: req.user.name,
      action: "deleted issue",
    })

    await newLog.save();

    res.json({ msg: "Issue removed" });
  } catch (err) {
    console.error("fr: delete issue", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
