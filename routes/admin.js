// @TODOS
// need to remove cookie when logging out

/*
These routes are admin privilage only where you can...

register admin
register user
get all users
delete user
==============
add new project
get all project
update project
delete project
==============
logout admin
*/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const User = require("../models/User");
const Project = require("../models/Project");
const Log = require("../models/Log");

// @route   POST api/admin/registerUser
// @desc    Register a user
// @access  Private
router.post(
  "/registerUser",
  auth,
  [
    check("firstName", "Please enter a first name").not().isEmpty(),
    check("lastName", "Please enter a last name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, role } = req.body;

    try {
      let newUser = await User.findOne({ email });
      let user = await User.findById(req.user.id);

      if (newUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      // Log admin action
      const newLog = new Log({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        action: `just registered new user ${firstName} ${lastName}`,
      });

      await newLog.save();

      res.json({ newUser, msg: "User successfully registered!" });
    } catch (err) {
      console.error("fr register newUser:", err.message);
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
      date: -1,
    });
    if (!users) return res.status(404).json({ msg: "Users not found" });
    res.json(users);
  } catch (err) {
    console.error("fr: get all users:", err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/admin/deleteUser
// @desc    Delete user
// @access  Private
router.delete("/deleteUser/:id", auth, async (req, res) => {
  try {
    const u = await User.findById(req.user.id);
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    // Log admin action
    const newLog = new Log({
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      action: `just deleted user ${user.firstName} ${user.lastName}`,
    });

    await newLog.save();
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error("fr admin delete user:", err.message);
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
      check("description", "Description is required").not().isEmpty(),
      check("projectName", "Name is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectName, status, description } = req.body;

    try {
      const user = await User.findById(req.user.id);

      const project = await Project.findOne({ projectName });

      if (!project) {
        // If no project with same name create new project
        const newProject = new Project({
          user: req.user.id,
          projectName,
          description,
          status,
        });
        await newProject.save();

        // Log admin action
        const newLog = new Log({
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          action: "just created new project " + projectName,
        });

        await newLog.save();
        res.json({ newProject, msg: "Project successfully created!" });
      } else {
        // Send error message to client
        return res.status(400).json({ msg: "Project already exists" });
      }
    } catch (err) {
      console.error("fr: admin add new project:", err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/admin/projects
// @desc    Get all projects
// @access  Private
router.get("/projects", auth, async (req, res) => {
  try {
    const projects = await Project.find({}).sort({
      date: -1,
    });
    res.json(projects);
  } catch (err) {
    console.error("fr: get all projects:", err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/admin/project/:id
// @desc    Update project
// @access  Private
router.put("/project/:id", auth, async (req, res) => {
  const { projectName, status, description } = req.body;
  const projectFields = {};
  if (projectName) projectFields.projectName = projectName;
  if (status) projectFields.status = status;
  if (description) projectFields.description = description;

  try {
    let project = await Project.findById(req.params.id);
    let user = await User.findById(req.user.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });
    else {
      // Update project
      project = await Project.findByIdAndUpdate(
        req.params.id,
        { $set: projectFields },
        { new: true }
      );

      // Log admin action
      const newLog = new Log({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        action: `${user.firstName} ${user.lastName} just updated ${projectName}`,
      });
      await newLog.save();
    }

    res.json({ project, msg: "Project successfully updated!" });
  } catch (err) {
    console.error("fr: admin update project:", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/admin/addTech/:id
// @desc    Add tech to project
// @access  Private
router.put(
  "/addTech/:id",
  [auth, [check("tech", "Tech is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tech } = req.body;

    const techFields = {};
    techFields._id = uuid.v4();
    if (tech) techFields.name = tech;

    try {
      let project = await Project.findById(req.params.id);
      let user = await User.findById(req.user.id);
      if (!project) return res.status(404).json({ msg: "Project not found" });

      const found = project.techs.find((user) => user.name === tech);

      if (!found) {
        // Assign new user to project
        project = await Project.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { techs: techFields } },
          { new: true }
        );

        // Log admin action
        const newLog = new Log({
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          action: `just added ${tech} to ${project.projectName}`,
        });
        await newLog.save();
      } else {
        return res.status(400).json({ msg: "Tech already added in the list" });
      }

      res.json({ project, msg: "User successfully added!" });
    } catch (err) {
      console.error("fr: admin update project:", err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/admin/removeTech/:id
// @desc    Remove tech from project
// @access  Private
router.put("/removeTech/:id", auth, async (req, res) => {
  const { techID } = req.body;

  try {
    const user = await User.findById(req.user.id);
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    const found = project.techs.find((tech) => tech._id === techID);

    if (found) {
      // Remove user from project
      project = await Project.findByIdAndUpdate(
        req.params.id,
        { $pull: { techs: { _id: techID } } },
        { new: true }
      );

      // Log admin action
      const newLog = new Log({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        action: `${user.firstName} ${user.lastName} just removed ${found.name} from ${project.projectName}`,
      });

      await newLog.save();
    } else {
      return res.status(404).json({ msg: "Tech not found in project" });
    }

    res.json({ project, msg: "User successfully removed!" });
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
    const user = await User.findById(req.user.id);
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: "Project not found" });
    // Delete a project
    await Project.findByIdAndRemove(req.params.id);

    // Log admin action
    const newLog = new Log({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      action: `${user.firstName} ${user.lastName} just delete the project ${project.projectName}`,
    });

    await newLog.save();

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
    const user = await User.findById(req.user.id);
    cookie = req.cookies;
    for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
        continue;
      }
      res.cookie(prop, "", { expires: new Date(0) });
    }
    res.send("logged out");

    // Log admin action when logging out
    const newLog = new Log({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      action: "logged out",
    });

    await newLog.save();
  } catch (err) {
    console.error("fr: logout", err.message);
  }
});

module.exports = router;
