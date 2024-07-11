const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Punteggio = sequelize.define('Punteggio', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    punteggio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Punteggio;
