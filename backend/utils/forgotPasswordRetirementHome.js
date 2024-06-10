const bcrypt = require("bcryptjs");
require("dotenv").config()
const jwt = require('jsonwebtoken')
let JWT_SECRET = process.env.SECRET 
const nodeMailer = require('nodemailer'); 
const RetirementHome = require("../models/RetirementHome");

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
        text: 'Dear Seniority partner,\n\n Please access the link below so as to reset your password. It is one time use only and expires in 15 minutes. \n\nRegards,\nThe Seniority Team \n\n' + link
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Confirmation email sent:', info.response);
        }
    });
};


const forgotPasswordRetirementHome = async (req, res) => {
    const {email} = req.body
    try {
        const retirement_home = await RetirementHome.findOne({ where: { email: email } });
        console.log(retirement_home)
        if (!retirement_home) {
          console.log("Wrong email");
          return res.status(400).render('auth/forgot-password-retirement-home', {message: "Fail. Incorrect email." });
        }
        // create a one-time link valid for 15 mins
        const secret = JWT_SECRET + retirement_home.password
        const payload = {
            email: retirement_home.email,
            id: retirement_home.id
        }
        const token = jwt.sign(payload, secret, {expiresIn: '15m'})
        const link = `http://localhost:3000/auth/reset-password-retirement-home/${retirement_home.id}/${token}.html`
        sendResetPasswordEmail(retirement_home.email, link)
        res.status(200).render('auth/forgot-password-retirement-home', {message: "Success. Check your email." });
    }
    catch(error){
        console.error("Error while querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
module.exports = forgotPasswordRetirementHome