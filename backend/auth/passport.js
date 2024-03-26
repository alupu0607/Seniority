LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const signinCheck = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    
        try {
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
              console.log(email, password);
              console.log("Wrong email");
              return done(null, false, { message: "Incorrect email" });
            }
            bcrypt.compare(password, user.password, (error, isMatch) => {
              if (error) throw error;
              if (isMatch) {
                console.log("Auth complete")
                return done(null, user);
              } else {
                console.log("Wrong password");
               return done(null, false, { message: "Incorrect password" });
              }
            });
          } catch (error) {
            console.error("Error while querying the database:", error);
            return done(error); 
          }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });  
};
module.exports = {
  signinCheck,
};