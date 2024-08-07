const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config()
const jwt = require('jsonwebtoken')
let JWT_SECRET = process.env.SECRET 

const checkValidResetLink = async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const email = isAuthenticated ? req.user.email : null;
    console.log('status 1:', isAuthenticated, email);
    let accountType = null;
    if (isAuthenticated && req.user) {
      if (req.user instanceof RetirementHome) {
          accountType = 'RetirementHome';
      } else if (req.user instanceof User) {
          accountType = 'User';
      }
    }
    console.log('status 2:', accountType);

    const {id,token} = req.params
    try {
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
          console.log("Wrong id");
          return res.status(400).json({ message: "Incorrect user id" });
        } 
        const secret = JWT_SECRET + user.password
        try{
            const payload = jwt.verify(token, secret)
            res.render('auth/reset-password', { id: id, token: token, isAuthenticated, email, accountType})
            //res.render(`auth/reset-password/${id}/${token}`)
        }catch(error){
            console.log(error.message)
            res.status(500).json({ message: error.message });
        }
    }
    catch(error){
        console.error("Error while querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = checkValidResetLink