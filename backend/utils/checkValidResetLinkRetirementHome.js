const RetirementHome = require("../models/RetirementHome");
const bcrypt = require("bcryptjs");
require("dotenv").config()
const jwt = require('jsonwebtoken')
let JWT_SECRET = process.env.SECRET 

const checkValidResetLinkRetirementHome = async (req, res) => {
    const {id,token} = req.params
    try {
        const retirement_home = await RetirementHome.findOne({ where: { id: id } });
        if (!retirement_home) {
          console.log("Wrong id");
          return res.status(400).json({ message: "Incorrect partner id" });
        } 
        const secret = JWT_SECRET + retirement_home.password
        try{
            const payload = jwt.verify(token, secret)
            res.render('auth/reset-password-retirement-home', { id: id, token: token})
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

module.exports = checkValidResetLinkRetirementHome