const User = require("../models/User");
const protectRoute = (req, res, next) =>{
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('Please log in to continue');
    res.redirect('/auth/signin');
  }
  const allowIf = (req, res, next) =>{
    if (!req.isAuthenticated()) {
      return next();
    }  
   console.log('You are already authenticated', req.user.email);
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
      allowIf,
      checkIfUserIsAdmin
    };