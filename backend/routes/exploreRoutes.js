const express = require('express');
const router = express.Router();
const exploreController = require('../controllers/exploreController');
const protectRoute = require('../auth/protect')

router.get('/partners.html', exploreController.getExplorePage);
router.get('/my-new-home.html', exploreController.getNewHomePage);

module.exports = router;