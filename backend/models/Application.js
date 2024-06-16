require("dotenv").config();
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

const RetirementHome = require('./RetirementHome');
const User = require('./User');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idRetirementHome: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'RetirementHomes',
      key: 'id'
    }
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  application_status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED'),
    allowNull: false,
    defaultValue: 'PENDING'
  }
});

Application.belongsTo(RetirementHome, { foreignKey: 'idRetirementHome' });
Application.belongsTo(User, { foreignKey: 'idUser' });

(async () => {
  await sequelize.sync({ after: true });
})();

module.exports = Application;
