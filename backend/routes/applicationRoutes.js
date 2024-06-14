const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

router.post('/application',applicationsController.postApplication);
router.get('/application/:email', applicationsController.getApplicationsByUserEmail);
router.delete('/application/:email', applicationsController.deleteApplicationsByUserEmail);
router.get('/application/retirementHome/:id', applicationsController.getApplicationsByRetirementHomeId);
router.put('/application/approve/:id', applicationsController.putApplicationByApplicationId);
module.exports = router;