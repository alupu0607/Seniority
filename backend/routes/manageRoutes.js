const express = require('express');
const router = express.Router();
const manageController = require('../controllers/manageController');
const protectRoute = require('../auth/protect')

router.get('/applicants.html', manageController.getApplicantsPage);
router.get('/registered-seniors.html', manageController.getRegisteredSeniorsPage);

module.exports = router;