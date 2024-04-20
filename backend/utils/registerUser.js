const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { email, surname, name, phone, birthdate, password, confirm_password } = req.body;

  if (!surname || !name || !phone || !birthdate || !email || !password || !confirm_password) {
    const emptyFields = [];
    if (!surname) emptyFields.push('surname');
    if (!name) emptyFields.push('name');
    if (!phone) emptyFields.push('phone');
    if (!birthdate) emptyFields.push('birthdate');
    if (!email) emptyFields.push('email');
    if (!password) emptyFields.push('password');
    if (!confirm_password) emptyFields.push('confirm_password');
    return res.status(400).render("auth/signup", { errorMessage: "Please fill in all the fields" });
  }

  if (password !== confirm_password) {
    return res.status(400).render("auth/signup", { errorMessage: "Passwords must match" });
  }

  try {
    const existingEmailUser = await User.findOne({ where: { email: email } });
    if (existingEmailUser) {
      return res.status(400).render("auth/signup", { errorMessage: "Email already exists" });
    }

    const newUser = new User({
      email,
      surname,
      name,
      phone,
      birthdate,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    return res.status(201).redirect("/auth/signin.html");
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

module.exports = registerUser;
