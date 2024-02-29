const ActivityMapping = require('../models/activityMapping');

// Controller function to add a new activity mapping
exports.addActivityMapping = async (req, res) => {
    try {
      const { user, date, activityId, isCompleted } = req.body;
  
      // Create the activity mapping
      const newActivityMapping = new ActivityMapping({ user, date, activity: activityId, isCompleted });
      await newActivityMapping.save();
  
      res.status(201).json(newActivityMapping);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Controller function to get activity mappings for a user
  exports.getActivityMappings = async (req, res) => {
    try {
      const userId = req.params.userId;
      const activityMappings = await ActivityMapping.find({ user: userId }).populate('activity');
      res.status(200).json(activityMappings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Controller function to mark activity as completed for a specific date
  exports.markActivityAsCompleted = async (req, res) => {
    try {
      const { isCompleted } = req.body;
      const { activityMappingId } = req.params;
      const updatedActivityMapping = await ActivityMapping.findByIdAndUpdate(activityMappingId, { isCompleted: isCompleted }, { new: true });
      res.status(200).json(updatedActivityMapping);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  //Controller function to delete an activity mapping
  exports.deleteActivityMapping = async (req, res) => {
    try {
      const activityMappingId = req.params.activityMappingId;
      await ActivityMapping.findByIdAndDelete(activityMappingId);
      res.status(200).json({ message: 'Activity mapping deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };