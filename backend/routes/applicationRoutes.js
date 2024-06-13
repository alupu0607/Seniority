const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

router.post('/application',applicationsController.postApplication);
router.get('/application/:email', applicationsController.getApplicationsByUserEmail);
router.delete('/application/:email', applicationsController.deleteApplicationsByUserEmail);
module.exports = router;