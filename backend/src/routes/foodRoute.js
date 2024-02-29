const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const foodMappingController = require('../controllers/foodMappingController');

router.post('/', foodController.addFoodEntry);
router.delete('/:foodId', foodController.deleteFoodEntry);
router.put('/:foodId', foodController.updateFoodEntry);
router.get('/:foodId', foodController.getFoodEntryById);

router.get('/map/:userId', foodMappingController.getFoodEntries);
router.get('/map/:userId/:date', foodMappingController.getFoodEntriesForDate);
router.post('/map', foodMappingController.addFoodEntryMapping);
router.put('/map/:foodMappingId', foodMappingController.markFoodEntryAsDone);
router.delete('/map/:foodMappingId', foodMappingController.deleteFoodEntry);

module.exports = router;
