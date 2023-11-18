const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Prize = sequelize.define('prize', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Prize;