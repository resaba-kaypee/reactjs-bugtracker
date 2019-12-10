const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Open'
  },
  assignedTo: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('issue', IssueSchema);