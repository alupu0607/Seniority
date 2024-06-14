const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/user/:email', usersController.getUserByEmail);
router.get('/user/id/:id', usersController.getUserById);
module.exports = router;