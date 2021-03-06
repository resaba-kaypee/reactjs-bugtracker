const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const uuid = require("uuid");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Issue = require("../models/Issue");
const Log = require("../models/Log");
const Project = require("../models/Project");

// @route   GET api/issues
// @desc    Get user's issue
// @access  Private
router.get("/reportbyme", auth, async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(issues);
  } catch (error) {
    console.error("fr: get all issue", error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/issues
// @desc    Get all users issue
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const issues = await Issue.find({}).sort({
      date: -1,
    });

    if (!issues) {
      return res.status(404).json({ msg: "Issues not found" });
    }

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
  "/newIssue",
  [auth, [check("description", "Description is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectName, description, priority, status, tech, date } = req.body;

    try {
      const project = Project.findOne({ projectName });
      let user = await User.findById(req.user.id);

      if (project) {
        const newIssue = new Issue({
          user: req.user.id,
          projectName,
          description,
          priority,
          status,
          tech,
          date,
        });
        await newIssue.save();

        // Log users action
        const newLog = new Log({
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          action: `${user.firstName} ${user.lastName} just added new issue to ${projectName}`,
        });

        await newLog.save();
        res.json({ newIssue, msg: "Issue successfully reported!" });
      } else {
        // Send error message to client
        return res.status(400).json({
          msg: "The project that you want to report an issue does not exists!",
        });
      }
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
    let user = await User.findById(req.user.id);

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

    const newLog = new Log({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      action: `${user.firstName} ${user.lastName} updated issue with the id of ${issue._id}`,
    });

    await newLog.save();

    res.json({ issue, msg: "Issue successfully updated!" });
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
    let user = await User.findById(req.user.id);

    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: commentFields } },
      { new: true }
    );

    const newLog = new Log({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      action: `${user.firstName} ${user.lastName} commented to issue with the id of ${issue._id}`,
    });

    await newLog.save();

    res.json({ issue, msg: "Comment successfully added!" });
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
    let user = await User.findById(req.user.id);

    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    // Make sure user owns issue
    // if (issue.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    await Issue.findByIdAndRemove(req.params.id);

    const newLog = new Log({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      action: `${user.firstName} ${user.lastName} deleted issue with the id of ${issue._id}`,
    });

    await newLog.save();

    res.json({ msg: "Issue removed" });
  } catch (err) {
    console.error("fr: delete issue", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
