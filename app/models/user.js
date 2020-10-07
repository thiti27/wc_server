const Sequelize = require('sequelize');
const sequelize = require('../../config/mysql');

const user = sequelize.define(
    "users",
    {
        user_id :{
            type: Sequelize.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        }, 
        password: {
            type: Sequelize.STRING,
            allowNull: false,            
        },
       
    }
);

module.exports = user