const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  projectName: {
    type: String
  },
  status: {
    type: String
  },
  description: {
    type: String,
  },
  techs: [{}],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("project", ProjectSchema);
