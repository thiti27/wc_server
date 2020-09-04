const config = require('./config');
const createNamespace = require('continuation-local-storage').createNamespace;
const namespace = createNamespace('wc_db');
const Sequelize = require('sequelize');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(config.env.dbConnectionConfig.database,
    config.env.dbConnectionConfig.user,
    config.env.dbConnectionConfig.password,
    config.env.dbConnectionConfig.options);

module.exports = sequelize;
