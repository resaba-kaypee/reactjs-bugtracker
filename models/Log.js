const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  username: {
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
