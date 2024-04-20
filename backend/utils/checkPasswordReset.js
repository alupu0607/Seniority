const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config()
const jwt = require('jsonwebtoken')
let JWT_SECRET = process.env.SECRET 

const checkPasswordReset = async (req, res) =>{
    const {id,token} = req.params
    const {password,confirm_password} = req.body
    try {
        const user = await User.findOne({ where: { id: id } });
        console.log(user)
        if (!user) {
          return res.status(400).json({ message: "Incorrect user id" });
        } 
        const secret = JWT_SECRET + user.password
        try{
            const payload = jwt.verify(token, secret)
        if (password !== confirm_password) {
            return res.status(400).render('auth/reset-password',{ id: id, token: token, message: "Fail. Passwords do not match." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.update(
            { password: hashedPassword },
            { where: { id: id } }
        );
        console.log(user)
        res.status(200).render('auth/reset-password', {id:id, token:token, message: "Success. Password was reset." });
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
module.exports = checkPasswordReset