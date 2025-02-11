import { Sequelize } from 'sequelize';

// Create a new instance of Sequelize with the connection string to our database
const sequelize = new Sequelize('passion_lecture', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Set to console.log to see SQL queries in console
});

// Test the connection
try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// export default sequelize;