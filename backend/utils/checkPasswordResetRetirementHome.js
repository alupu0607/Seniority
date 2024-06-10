const RetirementHome = require("../models/RetirementHome");
const bcrypt = require("bcryptjs");
require("dotenv").config()
const jwt = require('jsonwebtoken')
let JWT_SECRET = process.env.SECRET 

const checkPasswordResetRetirementHome = async (req, res) =>{
    const {id,token} = req.params
    const {password,confirm_password} = req.body
    try {
        const retirementHome = await RetirementHome.findOne({ where: { id: id } });
        console.log(retirementHome)
        if (!retirementHome) {
          return res.status(400).json({ message: "Incorrect partner id" });
        } 
        const secret = JWT_SECRET + retirementHome.password
        try{
            const payload = jwt.verify(token, secret)
        if (password !== confirm_password) {
            return res.status(400).render('auth/reset-password-retirement-home',{ id: id, token: token, message: "Fail. Passwords do not match." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const retirementHome = await RetirementHome.update(
            { password: hashedPassword },
            { where: { id: id } }
        );
        console.log(retirementHome)
        res.status(200).render('auth/reset-password-retirement-home', {id:id, token:token, message: "Success. Password was reset." });
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
module.exports = checkPasswordResetRetirementHome