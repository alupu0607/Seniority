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
              return done(null, false, { message: "Unfound email!", status: 404});
            }
            bcrypt.compare(password, user.password, (error, isMatch) => {
              if (error) throw error;
              if (isMatch) {
                return done(null, user,{status: 200 });
              } else {
               return done(null, false, { message: "Incorrect password!", status: 404 });
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