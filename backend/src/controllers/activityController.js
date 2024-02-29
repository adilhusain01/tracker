const Activity = require('../models/activityModel');

// Controller function to add a new activity 
exports.addActivity = async (req, res) => {
  try {
    const { name, user } = req.body;

    // Create the activity 
    const newActivity = new Activity({ name, user });
    await newActivity.save();

    res.status(201).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get all activity 
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get an activity by ID
exports.getActivityById = async (req, res) => {
  try {
    const activityId = req.params.activityId;
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getActivityByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const activities = await Activity.find({ user: userId });
    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: 'Activities not found' });
    }
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller function to update an activity
exports.updateActivity = async (req, res) => {
  try {
    const activityId = req.params.activityId;
    const { name } = req.body;
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { name },
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete an activity
exports.deleteActivity = async (req, res) => {
  try {
    const activityId = req.params.activityId;
    const deletedActivity = await Activity.findByIdAndDelete(activityId);
    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
