const RetirementHome = require("../models/RetirementHome");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '0607andreea.ro@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const registerRetirementHome = async (req, res) => {
  const { email, name, rating, phone_number, website, city, latitude, longitude, password, confirm_password } = req.body;


  if (!email || !name || !rating || !phone_number || !website || !city || !latitude || !longitude || !password || !confirm_password) {
    return res.status(400).render("auth/retirement-home-signup", { errorMessage: "Please fill in all the fields" });
  }

  if (password !== confirm_password) {
    return res.status(400).render("auth/retirement-home-signup", { errorMessage: "Passwords must match" });
  }

  try {

    const existingEmailUser = await RetirementHome.findOne({ where: { email: email } });
    if (existingEmailUser) {
      return res.status(400).render("auth/retirement-home-signup", { errorMessage: "Email already exists" });
    }

    const newRetirementHome = new RetirementHome({
      email,
      name,
      rating, 
      phone_number,
      website,
      city,
      latitude,
      longitude,
      password,
      isVerified: false 
    });

    const salt = await bcrypt.genSalt(10);
    newRetirementHome.password = await bcrypt.hash(newRetirementHome.password, salt);

    const verificationToken = jwt.sign({ email }, process.env.SECRET, { expiresIn: '7d' });
    newRetirementHome.verificationToken = verificationToken;

    await newRetirementHome.save();
    const link = `http://localhost:3000/auth/verify-retirement-home/${verificationToken}.html`
    const adminEmailContent = `
     Dear Seniority admin 😊, 

      We have received a partnership request from a new retirement home seeking to join our esteemed network. Below are the provided details for your review:
      - Name: ${name}
      - Email: ${email}
      - Rating: ${rating}
      - Phone: ${phone_number}
      - Website: ${website}
      - City: ${city}
      - Location: (${latitude}, ${longitude})

      As part of our rigorous verification process, we kindly request your attention to review the information provided. Your assessment of the trustworthiness of this retirement home is vital in maintaining the integrity and quality of our partnerships.
      If you deem the retirement home to be suitable for partnership, please proceed by clicking on the following link to verify the account:
      ${link}
    `;

    const retirementHomeEmailContent = `
      Greetings,

      We are currently in the process of thoroughly verifying the information provided to ensure a seamless partnership experience. Your dedication to transparency and integrity is fundamental to our commitment to excellence.

      Rest assured that we will be in touch with you shortly to discuss the next steps. Our team will reach out to you for further communication and, upon successful verification, we anticipate activating your account within a maximum of 7 days. You will be contacted via email or phone.

      We appreciate your patience and cooperation throughout this process. Should you have any questions or require further assistance, please feel free to reach out to us at any time.

      Looking forward to a successful partnership.

      Warm regards, 
      🍀Seniority Team
    `;

    await transporter.sendMail({
      from: '0607andreea.ro@gmail.com',
      to: '0607andreea.ro@gmail.com',
      subject: 'New Retirement Home Partner Request',
      text: adminEmailContent,
    });

    await transporter.sendMail({
      from: '0607andreea.ro@gmail.com',
      to: email,
      subject: 'Seniority Partnership Request Received',
      text: retirementHomeEmailContent,
    });
    return res.status(201).redirect("/auth/signin.html");
  } catch (error) {
    console.error("Error registering retirement home:", error);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

module.exports = registerRetirementHome;
