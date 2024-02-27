const mongoose = require('mongoose');

const foodMappingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food', // Reference to the Food model
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

const FoodMapping = mongoose.model('FoodMapping', foodMappingSchema);

module.exports = FoodMapping;
