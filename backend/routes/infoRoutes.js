const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const protectRoute = require('../auth/protect')
//router.get('/', infoController.getAboutPage);
router.get('/about.html', infoController.getAboutPage);
router.get('/help.html', infoController.getHelpPage);
router.get('/user-profile.html', protectRoute.protectRoute, infoController.getUserProfilePage);
module.exports = router;