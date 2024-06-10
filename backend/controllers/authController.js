const registerUser = require("../utils/registerUser");
const registerRetirementHome = require("../utils/registerRetirementHome");
const signinUser = require('../utils/signinUser')
const signinRetirementHome = require('../utils/signinRetirementHome');
const forgotPasswordUser = require('../utils/forgotPasswordUser');
const forgotPasswordRetirementHome = require('../utils/forgotPasswordRetirementHome');
const checkValidResetLink = require("../utils/checkValidResetLink");
const checkValidResetLinkRetirementHome = require("../utils/checkValidResetLinkRetirementHome");
const checkValidVerifyLink = require("../utils/checkValidVerifyLink");
const checkPasswordReset = require("../utils/checkPasswordReset");
const checkPasswordResetRetirementHome = require("../utils/checkPasswordResetRetirementHome");
const postButtonRetirementPage = require("../utils/postButtonRetirementPage");
const RetirementHome = require("../models/RetirementHome");
const User = require("../models/User");
exports.getSignInPage = (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  const email = isAuthenticated ? req.user.email : null;
  console.log('status 1:',isAuthenticated, email);
  let accountType = null;
  if (isAuthenticated && req.user) {
    if (req.user instanceof RetirementHome) {
        accountType = 'RetirementHome';
    } else if (req.user instanceof User) {
        accountType = 'User';
    }
  }
  console.log('status 2:', accountType);

  const flashMessages = req.flash('error');
  const errorMessage = flashMessages.length > 0 ? flashMessages[0] : null;
 
  res.render('auth/signin', {isAuthenticated, accountType, email, errorMessage});
  };
  
  exports.postSignIn = (req, res) => {
   signinUser(req,res)
  };
  
  exports.getSignUpPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    console.log('status 1:',isAuthenticated, email);
    let accountType = null;
    if (isAuthenticated && req.user) {
      if (req.user instanceof RetirementHome) {
          accountType = 'RetirementHome';
      } else if (req.user instanceof User) {
          accountType = 'User';
      }
    }
    console.log('status 2:', accountType);

    const errorMessage = req.errorMessage;
    res.render('auth/signup', {isAuthenticated, accountType, email, errorMessage});
  };
  
  exports.postSignUp = (req, res) => {
    registerUser(req,res);
  };

  // retirement-home-signup
  exports.getSignUpRetirementPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    console.log('status 1:',isAuthenticated, email);
    let accountType = null;
    if (isAuthenticated && req.user) {
      if (req.user instanceof RetirementHome) {
          accountType = 'RetirementHome';
      } else if (req.user instanceof User) {
          accountType = 'User';
      }
    }
    console.log('status 2:', accountType);

    const errorMessage = req.errorMessage;
    res.render('auth/retirement-home-signup', {isAuthenticated, accountType, email,errorMessage});
  };
  
  exports.postSignUpRetirementPage = (req, res) => {
    registerRetirementHome(req,res);
  };

  exports.getVerifyRetirementPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    console.log('status 1:',isAuthenticated, email);
    let accountType = null;
    if (isAuthenticated && req.user) {
      if (req.user instanceof RetirementHome) {
          accountType = 'RetirementHome';
      } else if (req.user instanceof User) {
          accountType = 'User';
      }
    }
    console.log('status 2:', accountType);
    //I MIGHT PROTECT THIS ROUTE
    checkValidVerifyLink(req,res);
  };

  exports.postVerifyRetirementPage = (req, res) => {
    postButtonRetirementPage(req,res);
  };
  //SIGNIN retirement
  exports.getRetirementPageSignin = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    console.log('status 1:',isAuthenticated, email);
    let accountType = null;
    if (isAuthenticated && req.user) {
      if (req.user instanceof RetirementHome) {
          accountType = 'RetirementHome';
      } else if (req.user instanceof User) {
          accountType = 'User';
      }
    }
    console.log('status 2:', accountType);

    const flashMessages = req.flash('error');
    const errorMessage = flashMessages.length > 0 ? flashMessages[0] : null;
   
    res.render('auth/retirement-home-signin', {isAuthenticated, accountType, email, errorMessage});
    };
    
  exports.postRetirementPageSignIn = (req, res) => {
     signinRetirementHome(req,res)
    };
  //Forgot-password
  exports.getForgotPasswordPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    console.log('status 1:',isAuthenticated, email);
    let accountType = null;
    if (isAuthenticated && req.user) {
      if (req.user instanceof RetirementHome) {
          accountType = 'RetirementHome';
      } else if (req.user instanceof User) {
          accountType = 'User';
      }
    }
    console.log('status 2:', accountType);

    res.render('auth/forgot-password', {isAuthenticated, accountType, email});
  };
 
  exports.postForgotPasswordPage = (req, res) => {
   forgotPasswordUser(req,res)
  };

  // forgot password retirement home
  exports.getForgotPasswordRetirementPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    console.log('status 1:',isAuthenticated, email);
    let accountType = null;
    if (isAuthenticated && req.user) {
      if (req.user instanceof RetirementHome) {
          accountType = 'RetirementHome';
      } else if (req.user instanceof User) {
          accountType = 'User';
      }
    }
    console.log('status 2:', accountType);

    res.render('auth/forgot-password-retirement-home', {isAuthenticated, accountType, email});
  };
 
  exports.postForgotPasswordRetirementPage = (req, res) => {
   forgotPasswordRetirementHome(req,res)
  };
  // reset password retirement home
  exports.getResetPasswordRetirementPage = (req, res) => {
    // THE USER MIGHT USE THIS EVEN IF LOGGED IN TO CHANGE THE PASSWORD
    checkValidResetLinkRetirementHome(req,res)
  };
 
  exports.postResetPasswordRetirementPage = (req, res) => {
   checkPasswordResetRetirementHome(req,res)
  };
  //Reset-password
  exports.getResetPasswordPage = (req, res) => {
    // THE USER MIGHT USE THIS EVEN IF LOGGED IN TO CHANGE THE PASSWORD
    checkValidResetLink(req,res)
  };
 
  exports.postResetPasswordPage = (req, res) => {
   checkPasswordReset(req,res)
  };

  exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Internal Server Error');
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successful' });
        });
    });
};

  