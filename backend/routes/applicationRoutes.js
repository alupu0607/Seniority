const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');
const protectRoute = require('../auth/protect');

router.post('/application',protectRoute.allowIfAuthenticated,applicationsController.postApplication);
router.get('/application/:email',protectRoute.allowIfAuthenticated, applicationsController.getApplicationsByUserEmail);
router.delete('/application/:email',protectRoute.allowIfAuthenticated, applicationsController.deleteApplicationsByUserEmail);
router.get('/application/retirementHome/:id',protectRoute.allowIfAuthenticated, applicationsController.getApplicationsByRetirementHomeId);
router.put('/application/approve/:id', protectRoute.allowIfAuthenticated,applicationsController.putApplicationByApplicationId);
module.exports = router;