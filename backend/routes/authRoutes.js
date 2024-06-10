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

// SIGNUP RETIREMENT
router.get('/retirement-home-signup.html',authController.getSignUpRetirementPage);
router.post('/retirement-home-signup.html',authController.postSignUpRetirementPage);

// VERIFY RETIREMENT
router.get('/verify-retirement-home/:token.html', authController.getVerifyRetirementPage);
router.post('/verify-retirement-home/:token.html', authController.postVerifyRetirementPage);
//FORGOTPASSWORD
router.get('/forgot-password.html',authController.getForgotPasswordPage);
router.post('/forgot-password.html',authController.postForgotPasswordPage);

//RESETPASSWORD
router.get('/reset-password/:id/:token.html', authController.getResetPasswordPage);
router.post('/reset-password/:id/:token.html', authController.postResetPasswordPage);

//LOGOUT
router.get('/logout', authController.logout);

module.exports = router;
