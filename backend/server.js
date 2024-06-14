const express = require('express');
require("dotenv").config()
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const passport = require('passport')
const {signinCheck} = require('./auth/passport')
const session = require('express-session');
const flash = require("connect-flash");
const cron = require('node-cron');
signinCheck(passport)

// Middleware
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // adds CSS file
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
  secret: process.env.SECRET, 
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend', 'views'));

// Routes
const authRoutes = require('./routes/authRoutes'); //accesible by normal users 
app.use('/auth', authRoutes); 

const infoRoutes = require('./routes/infoRoutes');
app.use('/', infoRoutes)
app.use('/info', infoRoutes);

const exploreRoutes = require('./routes/exploreRoutes');
app.use('/explore', exploreRoutes);

const manageRoutes = require('./routes/manageRoutes');
app.use('/manage', manageRoutes);


const retirementHomesRoutes = require('./routes/retirementHomesRoutes');
app.use('/api/retirement-home-managment', retirementHomesRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const userRoutes = require('./routes/usersRoutes');
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
