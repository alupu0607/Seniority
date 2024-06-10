const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protectRoute = require('../auth/protect');
//SIGNIN
router.get('/signin.html',protectRoute.allowIfNotAuthenticated,authController.getSignInPage);
router.post('/signin.html',protectRoute.allowIfNotAuthenticated,authController.postSignIn);

//SIGNUP
router.get('/signup.html',protectRoute.allowIfNotAuthenticated,authController.getSignUpPage);
router.post('/signup.html',protectRoute.allowIfNotAuthenticated,authController.postSignUp);
router.get('/');

// SIGNUP RETIREMENT
router.get('/retirement-home-signup.html',protectRoute.allowIfNotAuthenticated,authController.getSignUpRetirementPage);
router.post('/retirement-home-signup.html',protectRoute.allowIfNotAuthenticated,authController.postSignUpRetirementPage);

// VERIFY RETIREMENT
router.get('/verify-retirement-home/:token.html', authController.getVerifyRetirementPage);
router.post('/verify-retirement-home/:token.html', authController.postVerifyRetirementPage);

// SIGNIN RETIREMENT
router.get('/retirement-home-signin.html',protectRoute.allowIfNotAuthenticated,authController.getRetirementPageSignin);
router.post('/retirement-home-signin.html',protectRoute.allowIfNotAuthenticated, authController.postRetirementPageSignIn);

//FORGOTPASSWORD
router.get('/forgot-password.html',protectRoute.allowIfNotAuthenticated, authController.getForgotPasswordPage);
router.post('/forgot-password.html',protectRoute.allowIfNotAuthenticated,authController.postForgotPasswordPage);

//RESETPASSWORD
router.get('/reset-password/:id/:token.html', protectRoute.allowIfNotAuthenticated,authController.getResetPasswordPage);
router.post('/reset-password/:id/:token.html', protectRoute.allowIfNotAuthenticated, authController.postResetPasswordPage);


//FORGOTPASSWORD retirement home
router.get('/forgot-password-retirement-home.html', protectRoute.allowIfNotAuthenticated, authController.getForgotPasswordRetirementPage);
router.post('/forgot-password-retirement-home.html', protectRoute.allowIfNotAuthenticated,authController.postForgotPasswordRetirementPage);

//RESETPASSWORD retirement home
router.get('/reset-password-retirement-home/:id/:token.html', protectRoute.allowIfNotAuthenticated,authController.getResetPasswordRetirementPage);
router.post('/reset-password-retirement-home/:id/:token.html', protectRoute.allowIfNotAuthenticated,authController.postResetPasswordRetirementPage);

//LOGOUT
router.post('/logout',protectRoute.allowIfAuthenticated, authController.logout);

module.exports = router;
