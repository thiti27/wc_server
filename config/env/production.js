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
    },
    edsServiceConfig: {
        urlUser: 'http://159.228.251.234:8080/EDSService/ws-services/userService?wsdl',
        urlEmployee: 'http://159.228.251.234:8080/EDSService/ws-services/employeeService?wsdl',
        urlSection: 'http://159.228.251.234:8080/EDSService/ws-services/sectionService?wsdl'
    },
    jwtConfig: {
        JWT_SECRET: 'Daicel Thailand',
        JWT_EXP: '30m'
    }
};
