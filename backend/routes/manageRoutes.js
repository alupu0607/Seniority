const express = require('express');
const router = express.Router();
const manageController = require('../controllers/manageController');
const protectRoute = require('../auth/protect')

router.get('/applicants.html',protectRoute.allowIfAuthenticated,  protectRoute.checkIfUserIsRetirementHome, manageController.getApplicantsPage);
router.get('/registered-seniors.html',protectRoute.allowIfAuthenticated,  protectRoute.checkIfUserIsRetirementHome, manageController.getRegisteredSeniorsPage);

module.exports = router;