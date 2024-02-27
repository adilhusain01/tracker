const mongoose = require('mongoose');

// Define the schema for individual ingredients
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  measurementType: {
    type: String,
    required: true
  }
});

// Define the schema for the food
const foodSchema = new mongoose.Schema({
  // foodId: {
  //   type: String,
  //   required: true
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  foodName: {
    type: String,
    required: true
  },
  isCompound: {
    type: Boolean,
    default: false
  },
  ingredients: {
    type: [ingredientSchema],
    default: undefined // Set default value to undefined
  },
  quantity: {
    type: Number,
    required: true // Required for solid foods
  },
  measurementType: {
    type: String,
    required: true // Required for solid foods
  },
  calories: {
    type: Number,
    required: true // Required for solid foods
  },
  protein: {
    type: Number,
    required: true // Required for solid foods
  }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
