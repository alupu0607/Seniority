require("dotenv").config()
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectToDatabase();

const User = sequelize.define('User', {
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
    // validation logic here 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  
    allowNull: false,
  }
});

(async () => {
  await sequelize.sync({ after: true }); 
})();

module.exports = User;

