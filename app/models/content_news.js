const Sequelize = require('sequelize');
const sequelize = require('../../config/mysql');
const content_news = sequelize.define(
    "content_news",
    {
        event_id: {
            type: Sequelize.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        event_name_th: {
            type: Sequelize.STRING,
            allowNull: true
        },
        event_name_en: {
            type: Sequelize.STRING,
            allowNull: true
        },
        content_detail_th: {
            type: Sequelize.STRING,
            allowNull: true
        },
        content_detail_en: {
            type: Sequelize.STRING,
        },
        event_datetime: {
            type: Sequelize.STRING,
            allowNull: true

        },

        post_by: {
            type: Sequelize.STRING,
        },

        post_date: {
            type: Sequelize.STRING,

        },

        published_date: {
            type: Sequelize.STRING,
            allowNull: true

        },
        csr: {
            type: Sequelize.NUMBER,
            defaultValue: 0
        },
        com_news: {
            type: Sequelize.NUMBER,
            defaultValue: 0
        },
        events: {
            type: Sequelize.NUMBER,
            defaultValue: 0
        },
        active: {
            type: Sequelize.NUMBER,
            defaultValue: 1
        }

    }
);

module.exports = content_news