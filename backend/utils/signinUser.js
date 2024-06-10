const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const signinUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Please fill in all the fields");
    } else {
      passport.authenticate("user-local", {
        successRedirect: "/info/about.html",
        failureRedirect: "/auth/signin.html",
        failureFlash: true,
      })(req, res);
    }
  };
  module.exports = signinUser;