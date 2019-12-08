const express = require('express');
const router = express.Router();

// @route   GET api/issues
// @desc    Get all users issue
// @access  Public
router.get('/', (req, res) => {
  res.send('Get all issues');
});

// @route   POST api/issues
// @desc    Add new issue
// @access  Public
router.post('/', (req, res) => {
  res.send('Add new issue');
});

// @route   PUT api/issues/
// @desc    Update issue
// @access  Public
router.put('/:id', (req, res) => {
  res.send('Update issue');
});

// @route   DELETE api/issues/
// @desc    Delete issue
// @access  Public
router.delete('/:id', (req, res) => {
  res.send('Delete issue');
});

module.exports = router;