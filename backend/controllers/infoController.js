require('dotenv').config();
const apiKey = process.env.GOOGLE_API;

exports.getAboutPage = (req, res) => {
  // const isAuthenticated = req.isAuthenticated();
  // const username = isAuthenticated ? req.user.username : null;
    res.render('info/about', {apiKey});
  };

  exports.getAiPage = (req, res) => {
    // const isAuthenticated = req.isAuthenticated();
    // const username = isAuthenticated ? req.user.username : null;
      res.render('info/ai', {apiKey});
    };

  exports.getHelpPage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const username = isAuthenticated ? req.user.username : null;
    res.render('info/help', {isAuthenticated, username});
  };

  exports.getUserProfilePage = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const username = isAuthenticated ? req.user.username : null;
    const isAdmin = isAuthenticated ? req.user.isAdmin : false;
    res.render('info/user-profile', {isAuthenticated, username, isAdmin});
  };