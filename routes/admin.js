/*
register admin
register user
get all users
==============
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
const { check, validationResult } = require("express-validator");
const authAdmin = require("../middleware/authAdmin");

const Admin = require("../models/Admin");
const User = require("../models/User");
const Issue = require("../models/Issue");
const Project = require("../models/Project");

// @route   POST api/admin/register
// @desc    Register a admin
// @access  Private
router.post(
  "/registerAdmin",
  authAdmin,
  [
    check("name", "Please enter a name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // res.send('admin registered')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ msg: "Admin already exists" });
      } else {
        admin = new Admin({
          name,
          email,
          password
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        await admin.save();

        return res.status(200).json({ msg: "Admin registered" });
      }

      // const payload = {
      //   admin: {
      //     id: admin.id
      //   }
      // };

      // jwt.sign(
      //   payload,
      //   config.get("jwtSecret"),
      //   {
      //     expiresIn: 360000
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
    } catch (err) {
      console.error("fr: register admin", err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/admin/user
// @desc    Register a user
// @access  Private
router.post(
  "/registerUser",
  authAdmin,
  [
    check("name", "Please enter a name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // res.send('user registered')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      } else {
        user = new User({
          name,
          email,
          password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        return res.status(200).json({ msg: "User registered" });
      }

      // const payload = {
      //   user: {
      //     id: user.id
      //   }
      // };

      // jwt.sign(
      //   payload,
      //   config.get("jwtSecret"),
      //   {
      //     expiresIn: 360000
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
    } catch (err) {
      console.error("fr: register user", err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/admin/users
// @desc    Get all users
// @access  Public
router.get("/users", authAdmin, async (req, res) => {
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

// @route   GET api/issues
// @desc    Get all users issue
// @access  Private
router.get("/issues", authAdmin, async (req, res) => {
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
  "/issues",
  [
    authAdmin,
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

    const { description, severity, status, assignedTo, date } = req.body;

    try {
      const newIssue = new Issue({
        description,
        severity,
        status,
        assignedTo,
        date
      });

      const issue = await newIssue.save();

      res.json(issue);
    } catch (error) {
      console.error("fr: admin add new issue", error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/admin/issues/:id
// @desc    Update issue
// @access  Public
router.put("/update/:id", authAdmin, async (req, res) => {
  const { description, severity, status, assignedTo, date } = req.body;

  // Build issue object
  const issueFields = {};
  if (description) issueFields.description = description;
  if (status) issueFields.status = status;
  if (severity) issueFields.severity = severity;
  if (assignedTo) issueFields.assignedTo = assignedTo;
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

// @route   DELETE api/issues/:id
// @desc    Delete issue
// @access  Public
router.delete("/issues/:id", authAdmin, async (req, res) => {
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
    authAdmin,
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
router.put("/project/:id", authAdmin, async (req, res) => {
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
router.put(
  "/removeTech/:id",
  // authAdmin,
  async (req, res) => {
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
  }
);

// @route   DELETE api/admin/project/:id
// @desc    Delete project
// @access  Public
router.delete("/project/:id", authAdmin, async (req, res) => {
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

module.exports = router;
