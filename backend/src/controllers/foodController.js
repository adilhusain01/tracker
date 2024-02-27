const Food = require('../models/foodModel');

// Controller function to add a new food entry
exports.addFoodEntry = async (req, res) => {
  try {
    const { user, foodName, isCompound, ingredients, quantity, measurementType, calories, protein } = req.body;

    // If the food is compound, ensure ingredients are provided
    if (isCompound && (!ingredients || ingredients.length === 0)) {
      return res.status(400).json({ message: 'Compound foods require ingredients' });
    }

    // Create the food entry
    const newFood = new Food({ user, foodName, isCompound, ingredients, quantity, measurementType, calories, protein });
    await newFood.save();

    res.status(201).json(newFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete a food entry
exports.deleteFoodEntry = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    await Food.findByIdAndDelete(foodId);
    res.status(200).json({ message: 'Food entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to update a food entry
exports.updateFoodEntry = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const { foodName, isCompound, ingredients, quantity, measurementType, calories, protein } = req.body;

    // If the food is compound, ensure ingredients are provided
    if (isCompound && (!ingredients || ingredients.length === 0)) {
      return res.status(400).json({ message: 'Compound foods require ingredients' });
    }

    // Find the food entry by ID and update its properties
    const updatedFood = await Food.findByIdAndUpdate(foodId, {
      foodName, isCompound, ingredients, quantity, measurementType, calories, protein
    }, { new: true });

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food entry not found' });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get a single food entry by ID
exports.getFoodEntryById = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const foodEntry = await Food.findById(foodId);

    if (!foodEntry) {
      return res.status(404).json({ message: 'Food entry not found' });
    }

    res.status(200).json(foodEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
