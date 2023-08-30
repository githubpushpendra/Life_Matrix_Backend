const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  task: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  },
  catagory: {
    URGIMP: {
      type: Boolean,
      default: true
    },
    NOTURGIMP: {
      type: Boolean,
      default: false
    },
    URGNOTIMP: {
      type: Boolean,
      default: false
    },
    NOTURGNOTIMP: {
      type: Boolean,
      default: false
    }
  }
})

module.exports = mongoose.model('Task', taskSchema)
module.exports.taskSchema = taskSchema