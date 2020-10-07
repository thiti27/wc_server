module.exports = {
    dbConnectionConfig: {
        database: 'wc_db',
        user: 'root',
        password: '1234',
        options: {
            host: 'localhost',
            dialect: 'mysql',
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
                timestamps: false 
            },
            timezone: '+07:00'
        }
    }
  
};
