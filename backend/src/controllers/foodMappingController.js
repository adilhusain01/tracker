const FoodMapping = require('../models/foodMapping');

// Controller function to add a new food entry mapping
exports.addFoodEntryMapping = async (req, res) => {
  try {
    const { user, date, foodId, isDone } = req.body;

    // Create the food entry mapping
    const newFoodMapping = new FoodMapping({ user, date, food: foodId, isDone });
    await newFoodMapping.save();

    res.status(201).json(newFoodMapping);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller function to get food entries for a user
exports.getFoodEntries = async (req, res) => {
  try {
    const userId = req.params.userId;
    const foodEntries = await FoodMapping.find({ user: userId }).populate('food');
    res.status(200).json(foodEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get food entries for a user on a specific date
exports.getFoodEntriesForDate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const date = req.params.date;
    const foodEntries = await FoodMapping.find({ user: userId, date: date }).populate('food');
    res.status(200).json(foodEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to mark food entry as done for a specific date
exports.markFoodEntryAsDone = async (req, res) => {
  try {
    const { foodMappingId, isDone } = req.body;
    const updatedFoodMapping = await FoodMapping.findByIdAndUpdate(foodMappingId, { isDone: isDone }, { new: true });
    res.status(200).json(updatedFoodMapping);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete a food entry
exports.deleteFoodEntry = async (req, res) => {
  try {
    const foodMappingId = req.params.foodMappingId;
    await FoodMapping.findByIdAndDelete(foodMappingId);
    res.status(200).json({ message: 'Food entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
