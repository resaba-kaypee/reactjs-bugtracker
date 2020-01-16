const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  date: {
    type: String
  }
})

module.exports = mongoose.model('log', LogSchema);