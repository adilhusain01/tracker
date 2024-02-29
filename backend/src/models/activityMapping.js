const mongoose = require('mongoose');

const activityMappingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity', // Reference to the ActivityTemplate model
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const ActivityMapping = mongoose.model('ActivityMapping', activityMappingSchema);

module.exports = ActivityMapping;
