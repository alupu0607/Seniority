require('dotenv').config();
const apiKey = process.env.GOOGLE_API;
const RetirementHome = require("../models/RetirementHome");
const User = require("../models/User");

exports.getExplorePage = (req, res) => {
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
    res.render('explore/partners', { isAuthenticated, email, accountType, apiKey});
    
  }