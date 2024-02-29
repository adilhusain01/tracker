const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }
  // Add any other fields you need for the activity template
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
