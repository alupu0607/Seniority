const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

router.post('/application',applicationsController.postApplication);
module.exports = router;