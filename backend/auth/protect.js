const User = require("../models/User");
const RetirementHome = require("../models/RetirementHome");
const protectRoute = (req, res, next) =>{
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('Please log in to continue');
    res.redirect('/auth/signin');
  }

  const allowIfNotAuthenticated = (req, res,next) =>{
  
    if (!req.isAuthenticated()) {
      return next();
    }  
     const errorMessage = ` You are already authenticated as ${req.user.email}. If you want to use this route, please logout first.`
    return res.status(403).render('info/error-handler', { errorMessage });
  }
   const allowIfAuthenticated = (req, res,next) =>{
    if (req.isAuthenticated()) {
      return next();
    }  
     const errorMessage = ` You are not authenticated. If you want to use this route, please signin first.`
    return res.status(403).render('info/error-handler', { errorMessage });
  }

  const checkIfUserIsSenior = async (req, res, next) => {
    console.log(req.user.id)
    try {
      if (req.user) {
        if (req.user instanceof User) {
            return next();
        }
      }
      const errorMessage = 'You do not have this permission. This is not a senior account.';
      res.status(403).render('info/error-handler', { errorMessage });
    }
    catch (error) {
        console.error('Error checking admin privileges:', error);
        res.status(500).send('Internal Server Error');
    }
  };

  const checkIfUserIsRetirementHome = async (req, res, next) => {
    console.log(req.user.id)
    try {
      if (req.user) {
        if (req.user instanceof RetirementHome) {
            return next();
        }
      }
      const errorMessage = 'You do not have this permission. This is not a retirement home account.';
      res.status(403).render('info/error-handler', { errorMessage });
    }
    catch (error) {
        console.error('Error checking admin privileges:', error);
        res.status(500).send('Internal Server Error');
    }
  };
  module.exports = {
      protectRoute,
      allowIfNotAuthenticated,
      allowIfAuthenticated,
      checkIfUserIsRetirementHome,
      checkIfUserIsSenior
  };