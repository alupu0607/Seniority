const express = require('express');
const router = express.Router();
const retirementHomesController = require('../controllers/retirementHomesController');

router.get('/retirement-homes', retirementHomesController.getRetirementHomes);
router.get('/retirement-homes/:id', retirementHomesController.getRetirementHome );

module.exports = router;