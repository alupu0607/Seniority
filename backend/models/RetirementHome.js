// retirementHome.js

const {Sequelize,  DataTypes } = require('sequelize'); 

const sequelize= new Sequelize({
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

const RetirementHome = sequelize.define('RetirementHome', {
    email : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
(async () => {
    await sequelize.sync({ after: true }); 
})();
  
module.exports = RetirementHome;
