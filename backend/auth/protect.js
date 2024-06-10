const User = require("../models/User");
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
    console.log('You are already authenticated', req.user.email);
     const errorMessage = ` You are already authenticated as ${req.user.email}. If you want to use this route, please logout first.`
    return res.status(403).render('info/error-handler', { errorMessage });
  }
  const allowIfAuthenticated = (req, res,next) =>{
    if (req.isAuthenticated()) {
      return next();
    }  
    console.log('You should do this only if authenticated');
     const errorMessage = ` You are already authenticated. If you want to use this route, please signin first.`
    return res.status(403).render('info/error-handler', { errorMessage });
  }


  const checkIfUserIsAdmin = async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        const userId = req.user.id; 
        const user = await User.findByPk(userId);
        if (user && user.isAdmin === true) {
          return next();
        }
      }
      res.status(400).send('You do not have this permission');
    } catch (error) {
      console.error('Error checking admin privileges:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  module.exports = {
      protectRoute,
      allowIfNotAuthenticated,
      allowIfAuthenticated,
      checkIfUserIsAdmin
    };