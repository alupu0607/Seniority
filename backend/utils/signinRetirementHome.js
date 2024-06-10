const passport = require("passport");
const RetirementHome = require("../models/RetirementHome");
const bcrypt = require("bcryptjs");

const signinRetirementHome = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Please fill in all the fields");
    return res.status(400).redirect("/auth/retirement-home-signin.html");
  }

  try {
    const retirementHome = await RetirementHome.findOne({ email: email });

    if (!retirementHome) {
      console.log("Retirement home not found");
      return res.status(404).redirect("/auth/retirement-home-signin.html");
    } else if (!retirementHome.isVerified) {
      console.log("Retirement home is not verified");
      return res.status(403).redirect("/auth/retirement-home-signin.html");
    } else {
      passport.authenticate("retirement-home-local", {
        successRedirect: "/info/about.html",
        failureRedirect: "/auth/retirement-home-signin.html",
        failureFlash: true,
      })(req, res);
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).redirect("/auth/retirement-home-signin.html");
  }
};

module.exports = signinRetirementHome;
