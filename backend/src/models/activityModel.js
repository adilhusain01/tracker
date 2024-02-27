const mongoose = require('mongoose');

const activityTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Add any other fields you need for the activity template
});

const ActivityTemplate = mongoose.model('ActivityTemplate', activityTemplateSchema);

module.exports = ActivityTemplate;
