const express = require('express');
const router = express.Router();
const activityTemplateController = require('../controllers/activityTemplateController');
const activityMappingController = require('../controllers/activityMappingController');

// Routes for activity templates
router.post('/', activityTemplateController.addActivityTemplate);
router.get('/', activityTemplateController.getAllActivityTemplates);

// Routes for activity mappings
router.post('/map', activityMappingController.addActivityMapping);
router.get('/map/:userId', activityMappingController.getActivityMappings);
router.put('/map/:activityMappingId', activityMappingController.markActivityAsCompleted);
router.delete('/map/:activityMappingId', activityMappingController.deleteActivityMapping);

module.exports = router;
