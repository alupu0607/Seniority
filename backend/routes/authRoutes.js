const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protectRoute = require('../auth/protect');
//SIGNIN
router.get('/signin.html',authController.getSignInPage);
router.post('/signin.html',authController.postSignIn);

//SIGNUP
router.get('/signup.html',authController.getSignUpPage);
router.post('/signup.html',authController.postSignUp);
router.get('/');

//FORGOTPASSWORD
router.get('/forgot-password.html',authController.getForgotPasswordPage);
router.post('/forgot-password.html',authController.postForgotPasswordPage);

//RESETPASSWORD
router.get('/reset-password/:id/:token.html', authController.getResetPasswordPage);
router.post('/reset-password/:id/:token.html', authController.postResetPasswordPage);

//LOGOUT
router.get('/logout', authController.logout);

module.exports = router;
