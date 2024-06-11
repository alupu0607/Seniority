const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/user/:email', usersController.getUserByEmail);

module.exports = router;