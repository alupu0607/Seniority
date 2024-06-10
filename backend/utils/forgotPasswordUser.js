const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config()
const jwt = require('jsonwebtoken')
let JWT_SECRET = process.env.SECRET 
const nodeMailer = require('nodemailer') 

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: '0607andreea.ro@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendResetPasswordEmail = (email, link) => {
    const mailOptions = {
        from: '0607andreea.ro@gmail.com',
        to: email,
        subject: 'Password reset',
        text: 'Dear Seniority user,\n\n Please access the link below so as to reset your password. It is one time use only and expires in 15 minutes. \n\nRegards,\nThe Seniority Team \n\n' + link
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Confirmation email sent:', info.response);
        }
    });
};


const forgotPasswordUser = async (req, res) => {    
    const {email} = req.body
    try {
        const user = await User.findOne({ where: { email: email } });
        console.log(user)
        if (!user) {
          console.log("Wrong email");
          return res.status(400).render('auth/forgot-password', {message: "Fail. Incorrect email." });
        }
        // create a one-time link valid for 15 mins
        const secret = JWT_SECRET + user.password
        const payload = {
            email: user.email,
            id: user.id
        }
        const token = jwt.sign(payload, secret, {expiresIn: '15m'})
        const link = `http://localhost:3000/auth/reset-password/${user.id}/${token}.html`
        sendResetPasswordEmail(user.email, link)
        res.status(200).render('auth/forgot-password', {message: "Success. Check your email." });
    }
    catch(error){
        console.error("Error while querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
module.exports = forgotPasswordUser