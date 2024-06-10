const registerUser = require("../utils/registerUser");
const registerRetirementHome = require("../utils/registerRetirementHome");
const signinUser = require('../utils/signinUser')
const forgotPasswordUser = require('../utils/forgotPasswordUser');
const checkValidResetLink = require("../utils/checkValidResetLink");
const checkValidVerifyLink = require("../utils/checkValidVerifyLink");
const checkPasswordReset = require("../utils/checkPasswordReset");
const postButtonRetirementPage = require("../utils/postButtonRetirementPage");

exports.getSignInPage = (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  const email = isAuthenticated ? req.user.email : null;

  const flashMessages = req.flash('error');
  const errorMessage = flashMessages.length > 0 ? flashMessages[0] : null;
 
  res.render('auth/signin', {isAuthenticated, email, errorMessage});
  };
  
  exports.postSignIn = (req, res) => {
   signinUser(req,res)
  };
  
  exports.getSignUpPage = (req, res) => {
    const errorMessage = req.errorMessage;
    res.render('auth/signup', {errorMessage});
  };
  
  exports.postSignUp = (req, res) => {
    registerUser(req,res);
  };

  // retirement-home-signup
  exports.getSignUpRetirementPage = (req, res) => {
    const errorMessage = req.errorMessage;
    res.render('auth/retirement-home-signup', {errorMessage});
  };
  
  exports.postSignUpRetirementPage = (req, res) => {
    registerRetirementHome(req,res);
  };

  exports.getVerifyRetirementPage = (req, res) => {
    checkValidVerifyLink(req,res);
  };

  exports.postVerifyRetirementPage = (req, res) => {
    postButtonRetirementPage(req,res);
  };

  //Forgot-password
  exports.getForgotPasswordPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    res.render('auth/forgot-password', {isAuthenticated,email});
  };
 
  exports.postForgotPasswordPage = (req, res) => {
   forgotPasswordUser(req,res)
  };

  //Reset-password
  exports.getResetPasswordPage = (req, res) => {
    checkValidResetLink(req,res)
  };
 
  exports.postResetPasswordPage = (req, res) => {
   checkPasswordReset(req,res)
  };

  //Logout
  exports.logout = (req, res) => {
    req.logout();
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  };
  
  