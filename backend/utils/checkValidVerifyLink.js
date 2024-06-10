const RetirementHome = require("../models/RetirementHome");

const checkValidVerifyLink = async (req, res) => {
  const { token } = req.params;

  try {
    const retirementHome = await RetirementHome.findOne({
      where: {
        verificationToken: token
      }
    });

    if (!retirementHome) {
      return res.render('auth/verify-retirement-home', { 
        errorMessage: 'Invalid or expired verification link. Please contact support for assistance.' 
      });
    }
    res.render('auth/verify-retirement-home', {
      errorMessage: null,
      email: retirementHome.email,
      name: retirementHome.name,
      rating: retirementHome.rating,
      phone: retirementHome.phone_number,
      website: retirementHome.website,
      city: retirementHome.city,
      latitude: retirementHome.latitude,
      longitude: retirementHome.longitude
    });

  } catch (error) {
    console.error("Error fetching verification details:", error);
    res.render('auth/verify-retirement-home', {
      errorMessage: 'An error occurred while verifying the link. Please try again later.'
    });
  }
};
module.exports = checkValidVerifyLink