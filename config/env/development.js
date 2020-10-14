module.exports = {
    dbConnectionConfig: {
        database: 'IxJIbPqSgm',
        user: 'IxJIbPqSgm',
        password: 'LOx8ot3ZyM',
        options: {
            host: 'remotemysql.com',
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
