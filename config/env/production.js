module.exports = {
    dbConnectionConfig: {
        database: 'wc_db',
        user: 'root',
        password: 'D@!cel16',
        options: {
            host: '159.228.166.203',
            dialect: 'mysql',
            logging: false,
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            },
            define: {
                underscored: true,
                freezeTableName: true,
                charset: 'utf8',
                dialectOptions: {
                    collate: 'utf8_general_ci'
                },
                timestamps: true
            },
            timezone: '+07:00',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    }
  
};
