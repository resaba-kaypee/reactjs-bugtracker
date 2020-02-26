/*
register admin
register user
get all users
delete user
============== to be remove
add new issue
get all issues
update issue
delete issue
==============
add new project
get all project
update project
delete project
*/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const uuid = require("uuid");
const { check, validationResult } = require("express-validator");
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

const Admin = require("../models/Admin");
const User = require("../models/User");
const Issue = require("../models/Issue");
const Project = require("../models/Project");

// @route   POST api/admin/registerUser
// @desc    Register a user
// @access  Private
router.post(
  "/registerUser",
  auth,
  [
    check("firstName", "Please enter a first name")
      .not()
      .isEmpty(),
    check("lastName", "Please enter a last name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { firstName, lastName, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
        role
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      
      res.json(user);
    } catch (err) {
      console.error("fr register user:", err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/admin/users
// @desc    Get all users
// @access  Public
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({}).sort({
      date: -1
    });
    if (!users) return res.status(404).json({ msg: "Users not found" });
    res.json(users);
  } catch (error) {
    console.error("fr: get all users:", error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/admin/deleteUser
// @desc    Delete user
// @access  Private
router.delete("/deleteUser/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error("fr admin delete user:", err.message);
    res.status(500).send("Server Error");
  }
});

/*********  **********  **********  **********
                                    ISSUES
*********  **********  **********  ***********/

// **************************************to be removed
// @route   GET api/admin/issues
// @desc    Get all users issue
// @access  Private
router.get("/issues", auth, async (req, res) => {
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

// **************************************to be removed
// @route   POST api/admin/issue
// @desc    Add new issue
// @access  Private
router.post(
  "/issue",
  [
    auth,
    [
      check("description", "Description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // res.send("admin added issue")
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

      res.json(issue);
    } catch (error) {
      console.error("fr: admin add new issue:", error.message);
      res.status(500).send("Server error");
    }
  }
);

// **************************************to be removed
// @route   PUT api/admin/issues/:id
// @desc    Update issue
// @access  Public
router.put("/update/:id", authAdmin, async (req, res) => {
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

    issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $set: issueFields },
      { new: true }
    );

    res.json(issue);
  } catch (err) {
    console.error("fr: admin update issue", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/admin/comment/:id
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
router.delete("/issues/:id", auth, async (req, res) => {
  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    // Make sure user owns issue
    // if (issue.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    await Issue.findByIdAndRemove(req.params.id);
    res.json({ msg: "Issue removed" });
  } catch (err) {
    console.error("fr: admin delete issue", err.message);
    res.status(500).send("Server Error");
  }
});

/*********  **********  **********  **********
                                    PROJECT
*********  **********  **********  ***********/

// @route   POST api/admin/project
// @desc    Add new project
// @access  Private
router.post(
  "/project",
  [
    auth,
    [
      check("description", "Description is required")
        .not()
        .isEmpty(),
      check("projectName", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // res.send("Send projects");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectName, status, description } = req.body;

    try {
      const newProject = new Project({
        projectName,
        description,
        status
      });

      const project = await newProject.save();

      res.json(project);
    } catch (error) {
      console.error("fr: admin add new project:", error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/admin/projects
// @desc    Get all projects
// @access  Private
router.get("/projects", authAdmin, async (req, res) => {
  // res.send("get all projects")
  try {
    const projects = await Project.find({}).sort({
      date: -1
    });
    res.json(projects);
  } catch (error) {
    console.error("fr: get all projects:", error.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/admin/project/:id
// @desc    Update project
// @access  Private
router.put("/project/:id", auth, async (req, res) => {
  const { projectName, status, description, tech } = req.body;
  const projectFields = {};
  if (projectName) projectFields.projectName = projectName;
  if (status) projectFields.status = status;
  if (description) projectFields.description = description;

  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    if (Object.keys(projectFields).length > 0) {
      project = await Project.findByIdAndUpdate(
        req.params.id,
        { $set: projectFields },
        { new: true }
      );
    } else {
      project = await Project.findByIdAndUpdate(
        req.params.id,
        { $push: { techs: tech } },
        { new: true }
      );
    }

    res.json(project);
  } catch (err) {
    console.error("fr: admin update project:", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/admin/removeTech/:id
// @desc    Remove tech from project
// @access  Private
router.put("/removeTech/:id", auth, async (req, res) => {
  const { tech } = req.body;

  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $pull: { techs: tech } },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error("fr: admin remove tech from project:", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/admin/project/:id
// @desc    Delete project
// @access  Public
router.delete("/project/:id", auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: "Project not found" });

    await Project.findByIdAndRemove(req.params.id);
    res.json({ msg: "Project removed" });
  } catch (err) {
    console.error("fr: admin delete project:", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/admin/logout
// @desc    Logout admin
// @access  Private
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
