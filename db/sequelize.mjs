import { Sequelize } from 'sequelize';

// Create a new instance of Sequelize with the connection string to our database
const sequelize = new Sequelize('db_passion_lecture', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 6033,
  logging: false, // Set to console.log to see SQL queries in console
  define: {
    freezeTableName: true,
  },
});

// Test the connection
try {
  await sequelize.authenticate();
  console.log('Connection to database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
