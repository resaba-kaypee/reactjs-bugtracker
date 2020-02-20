const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  role: {
    type: String
  },
  action: {
    type: String
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("log", LogSchema);
