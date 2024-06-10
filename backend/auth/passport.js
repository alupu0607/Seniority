LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const RetirementHome = require("../models/RetirementHome");
const bcrypt = require("bcryptjs");
const signinCheck = (passport) => {
  passport.use(
    'user-local',
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

  passport.use(
    'retirement-home-local',
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const retirementHome = await RetirementHome.findOne({ where: { email: email } });
        if (!retirementHome) {
          return done(null, false, { message: "Email not found!", status: 404 });
        }
        if (!retirementHome.isVerified) {
          return done(null, false, { message: "Retirement home not verified!", status: 403 });
        }
        bcrypt.compare(password, retirementHome.password, (error, isMatch) => {
          if (error) throw error;
          if (isMatch) {
            return done(null, retirementHome, { status: 200 });
          } else {
            return done(null, false, { message: "Incorrect password!", status: 401 });
          }
        });
      } catch (error) {
        console.error("Error while querying the database:", error);
        return done(error);
      }
    })
  );

  // the user can be either senior user or retirement home user
  // passport.serializeUser((user, done) => {
  //   console.log("heeloooo", user);
  //   done(null, user.id);
  // });
  passport.serializeUser((userOrRetirementHome, done) => {
    console.log("Object type", userOrRetirementHome.constructor)
    let type;
    if (userOrRetirementHome instanceof User) {
      type = 'User';
    } else if (userOrRetirementHome instanceof RetirementHome) {
      type = 'RetirementHome';
    } else {
      return done(null, new Error('Unrecognized object type'));
    }
    done(null, { id: `${type}:${userOrRetirementHome.id}`});
  });
  // passport.deserializeUser(async (id, done) => {
  //   try {
  //     const user = await User.findByPk(id);
  //     done(null, user);
  //   } catch (error) {
  //     done(error, null);
  //   }
  // });  
  passport.deserializeUser(async (obj, done) => {
    console.log(obj);
    try {
      let fields = obj.id;
      console.log(fields)
      fields = fields.toString();
      [type,id] = fields.split(':');

      let account; 
      if (type === "User") {
        account = await User.findByPk(id);
        console.log('user account')
      } else if (type === "RetirementHome") {
        account = await RetirementHome.findByPk(id);
        console.log('retirement home account');
      } else {
        return done(null, new Error('Unrecognized object type'));
      }  
      done(null, account);
    } catch (error) {
      done(error, null);
    }
  });
};
module.exports = {
  signinCheck,
};





// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/User");
// const RetirementHome = require("../models/RetirementHome");
// const bcrypt = require("bcryptjs");

// const signinCheck = (passport) => {
//   passport.use('user-local',
//     new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//       try {
//         const user = await User.findOne({ where: { email: email } });
//         if (!user) {
//           return done(null, false, { message: "Email not found!", status: 404 });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//           return done(null, user, { status: 200 });
//         } else {
//           return done(null, false, { message: "Incorrect password!", status: 401 });
//         }
//       } catch (error) {
//         console.error("Error while querying the database:", error);
//         return done(error);
//       }
//     })
//   );

//   passport.use('retirement-home-local',
//     new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//       try {
//         const retirementHome = await RetirementHome.findOne({ where: { email: email } });
//         if (!retirementHome) {
//           return done(null, false, { message: "Email not found!", status: 404 });
//         }
//         if (!retirementHome.isVerified) {
//           return done(null, false, { message: "Retirement home not verified!", status: 403 });
//         }
//         const isMatch = await bcrypt.compare(password, retirementHome.password);
//         if (isMatch) {
//           return done(null, retirementHome, { status: 200 });
//         } else {
//           return done(null, false, { message: "Incorrect password!", status: 401 });
//         }
//       } catch (error) {
//         console.error("Error while querying the database:", error);
//         return done(error);
//       }
//     })
//   );

//   passport.serializeUser((account, done) => {
//     done(null, { id: account.id, type: account.constructor.name });
//   });

//   passport.deserializeUser(async (obj, done) => {
//     try {
//       let account;
//       if (obj.type === "User") {
//         account = await User.findByPk(obj.id);
//         console.log('logged in as a senior');
//       } else if (obj.type === "RetirementHome") {
//         account = await RetirementHome.findByPk(obj.id);
//         console.log('logged in as a retirement home');
//       }
//       done(null, account);
//     } catch (error) {
//       done(error, null);
//     }
//   });
// };

// module.exports = {
//   signinCheck,
// };
