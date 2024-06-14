require('dotenv').config();
const apiKey = process.env.GOOGLE_API;
const RetirementHome = require("../models/RetirementHome");
const User = require("../models/User");

exports.getApplicantsPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    const id = isAuthenticated ? req.user.id : null;
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
    res.render('manage/applicants', { isAuthenticated, id, email, accountType, apiKey});
    
  }


  
exports.getRegisteredSeniorsPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    const id = isAuthenticated ? req.user.id : null;
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
    res.render('manage/registered-seniors', { isAuthenticated, email, id, accountType, apiKey});    
}