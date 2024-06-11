const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const protectRoute = require('../auth/protect')
//router.get('/', infoController.getAboutPage);
router.get('/about.html', infoController.getAboutPage);
router.get('/ai.html', infoController.getAiPage);
router.get('/explore.html', infoController.getExplorePage);
router.get('/error-handler.html', infoController.getErrorHandlerPage);
router.get('/user-profile.html', protectRoute.protectRoute, infoController.getUserProfilePage);
module.exports = router;