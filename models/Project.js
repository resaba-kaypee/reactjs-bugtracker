const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  projectName: {
    type: String
  },
  status: {
    type: String
  },
  description: {
    type: String,
  },
  techs: [String],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("project", ProjectSchema);
