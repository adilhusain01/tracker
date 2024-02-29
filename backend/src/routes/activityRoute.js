const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const activityMappingController = require('../controllers/activityMappingController');

// Routes for activity 
router.post('/', activityController.addActivity);
router.get('/', activityController.getAllActivities);
router.get('/:activityId', activityController.getActivityById);
router.put('/:activityId', activityController.updateActivity);
router.delete('/:activityId', activityController.deleteActivity);
router.get('/user/:userId', activityController.getActivityByUserId);

// Routes for activity mappings
router.post('/map', activityMappingController.addActivityMapping);
router.get('/map/:userId', activityMappingController.getActivityMappings);
router.put('/map/:activityMappingId', activityMappingController.markActivityAsCompleted);
// router.delete('/map/:activityMappingId', activityMappingController.deleteActivityMapping);

module.exports = router;
