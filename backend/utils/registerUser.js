const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { email, surname, name, phone, birthdate, password, confirm_password } = req.body;
  console.log(email, surname, name, phone, birthdate, password, confirm_password )
  if ( !surname || !name || !phone || !birthdate || !email || !password || !confirm_password) {
    const emptyFields = [];
    if (!surname) emptyFields.push('surname');
    if (!name) emptyFields.push('name');
    if (!phone) emptyFields.push('phone');
    if (!birthdate) emptyFields.push('birthdate');
    if (!email) emptyFields.push('email');
    if (!password) emptyFields.push('password');
    if (!confirm_password) emptyFields.push('confirm_password');
    console.log("Empty fields:", emptyFields.join(', '));
    return;
  }

  if (password !== confirm_password) {
    console.log("Password must match");
    return;
  }

  try {
    // Check if the email already exists
    const existingEmailUser = await User.findOne({ where: { email: email } });
    if (existingEmailUser) {
      console.log("Email already exists");
      res.render("auth/signup", {
        email,
      });
      return res.status(400).json({ message: "Email already exists" });
    }


    // If both email and username are unique, create a new user
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
    res.redirect("/auth/signin.html");
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

module.exports = registerUser;
