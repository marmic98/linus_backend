const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('linus_db', 'root', '1111', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
