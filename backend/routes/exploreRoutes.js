const express = require('express');
const router = express.Router();
const exploreController = require('../controllers/exploreController');
const protectRoute = require('../auth/protect')

router.get('/partners.html',protectRoute.allowIfAuthenticated, protectRoute.checkIfUserIsSenior, exploreController.getExplorePage);
router.get('/my-new-home.html',protectRoute.allowIfAuthenticated, protectRoute.checkIfUserIsSenior, exploreController.getNewHomePage);

module.exports = router;