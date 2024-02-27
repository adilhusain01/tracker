const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/:userId', userController.getUserDetails);
router.put('/update/:userId', userController.updateUserDetails);
router.delete('/delete/:userId', userController.deleteUserAccount);

module.exports = router;
