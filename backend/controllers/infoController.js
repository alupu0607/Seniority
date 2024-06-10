require('dotenv').config();
const apiKey = process.env.GOOGLE_API;
const RetirementHome = require("../models/RetirementHome");
const User = require("../models/User");
exports.getAboutPage = (req, res) => {
    console.log('HELOOOO ABOUT PAGE');
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    console.log('status 1:', isAuthenticated, email);
    let accountType = null;
    if (isAuthenticated && req.user) {
      if (req.user instanceof RetirementHome) {
          accountType = 'RetirementHome';
      } else if (req.user instanceof User) {
          accountType = 'User';
      }
    }
    console.log('status 2:', accountType);
    res.render('info/about', {isAuthenticated, accountType, email, apiKey});
  };

  exports.getAiPage = (req, res) => {
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
      res.render('info/ai', {isAuthenticated, accountType, email, apiKey});
    };


  exports.getUserProfilePage = (req, res) => {
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
    res.render('info/user-profile', {isAuthenticated, accountType, email, apiKey});
  };


  exports.getErrorHandlerPage = (req, res) => {
    res.render('info/error-handler', {errorMessage});
  };