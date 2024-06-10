const express = require('express');
const router = express.Router();
const retirementHomesController = require('../controllers/retirementHomesController');

router.get('/retirement-homes', retirementHomesController.getRetirementHomes);
module.exports = router;