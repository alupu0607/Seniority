const express = require('express');
const router = express.Router();
const retirementHomesController = require('../controllers/retirementHomesController');
const protectRoute = require('../auth/protect');
router.get('/retirement-homes', retirementHomesController.getRetirementHomes);
router.get('/retirement-homes/:id', protectRoute.allowIfAuthenticated, retirementHomesController.getRetirementHome );

module.exports = router;