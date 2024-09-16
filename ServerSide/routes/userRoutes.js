const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/save-user', userController.saveUser);
router.post('/save-liked-photo', userController.saveLikedPhoto);
router.get('/get-liked-photos', userController.getLikedPhotos);

module.exports = router;
