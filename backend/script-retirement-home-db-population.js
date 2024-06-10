require('dotenv').config();
const bcrypt = require('bcryptjs');
const RetirementHome = require('./models/RetirementHome');
const retirementHomesData = require('../../Seniority/frontend/retirement_homes.json');
const hashedPassword = bcrypt.hashSync(process.env.RETIREMENT_HOME_PASSWORD, 10);

(async () => {
  try {
    rh_number = 1;
    for (const city in retirementHomesData) {
      for (const homeData of retirementHomesData[city]) {
        rh_number++;
        verificationToken =  Math.random().toString(36);
        await RetirementHome.create({
          email: `invented${rh_number}@gmail.com`,
          name: homeData.name,
          city: city, 
          rating: homeData.rating,
          phone_number: homeData.phone_number,
          website: homeData.website,
          latitude: homeData.latitude,
          longitude: homeData.longitude,
          password: hashedPassword,
          isVerified: true,
          verificationToken: verificationToken,
        });
      }
    }
    console.log('Retirement homes added to the database successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error adding retirement homes to the database:', error);
    process.exit(1);
  }
})();
