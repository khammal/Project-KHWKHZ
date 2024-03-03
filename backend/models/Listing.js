const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Listing = db.define('Listing', {
    schoolName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Listing;
