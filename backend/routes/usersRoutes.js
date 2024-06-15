const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const protectRoute = require('../auth/protect');
router.get('/user/:email', protectRoute.allowIfAuthenticated, usersController.getUserByEmail);
router.get('/user/id/:id', protectRoute.allowIfAuthenticated, usersController.getUserById);
module.exports = router;