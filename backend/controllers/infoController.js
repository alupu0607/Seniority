
exports.getAboutPage = (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  const username = isAuthenticated ? req.user.username : null;
    res.render('info/about', {isAuthenticated, username});
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