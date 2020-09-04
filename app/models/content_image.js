const Sequelize = require('sequelize');
const sequelize = require('../../config/mysql');

const content_news = sequelize.define(
    "content_images",
    {
        image_id :{
            type: Sequelize.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        event_id :{
            type: Sequelize.NUMBER,
            allowNull : true
        },
        image_name: {
            type: Sequelize.STRING,
            allowNull : true
        },
        image_storage:{
            type: Sequelize.STRING,
            allowNull : true
        },
        image_size:{
            type: Sequelize.STRING,
            allowNull : true
        },
        image_type:{
            type: Sequelize.STRING,
        },
        image_header:{
            type: Sequelize.NUMBER,
            defaultValue: 0
        },
        active:{
            type: Sequelize.NUMBER,
            defaultValue: 1
        }

    }
);

module.exports = content_news