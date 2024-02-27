const ActivityTemplate = require('../models/activityModel');

// Controller function to add a new activity template
exports.addActivityTemplate = async (req, res) => {
  try {
    const { name } = req.body;

    // Create the activity template
    const newActivityTemplate = new ActivityTemplate({ name });
    await newActivityTemplate.save();

    res.status(201).json(newActivityTemplate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get all activity templates
exports.getAllActivityTemplates = async (req, res) => {
  try {
    const activityTemplates = await ActivityTemplate.find();
    res.status(200).json(activityTemplates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get an activity template by ID
exports.getActivityTemplateById = async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const activityTemplate = await ActivityTemplate.findById(templateId);
    if (!activityTemplate) {
      return res.status(404).json({ message: 'Activity template not found' });
    }
    res.status(200).json(activityTemplate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to update an activity template
exports.updateActivityTemplate = async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const { name } = req.body;
    const updatedTemplate = await ActivityTemplate.findByIdAndUpdate(
      templateId,
      { name },
      { new: true }
    );
    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Activity template not found' });
    }
    res.status(200).json(updatedTemplate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete an activity template
exports.deleteActivityTemplate = async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const deletedTemplate = await ActivityTemplate.findByIdAndDelete(templateId);
    if (!deletedTemplate) {
      return res.status(404).json({ message: 'Activity template not found' });
    }
    res.status(200).json({ message: 'Activity template deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
