const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  name: {
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
