const mongoose = require("mongoose");

const IssueSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  projectName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "open"
  },
  tech: {
    type: String,
    required: true
  },
  comments: [{}],
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("issue", IssueSchema);
