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
    },
    edsServiceConfig: {
        urlUser: 'http://159.228.251.234:8080/EDSService/ws-services/userService?wsdl',
        urlEmployee: 'http://159.228.251.234:8080/EDSService/ws-services/employeeService?wsdl',
        urlSection: 'http://159.228.251.234:8080/EDSService/ws-services/sectionService?wsdl'
    },
    jwtConfig: {
        JWT_SECRET: 'Daicel Thailand',
        JWT_EXP: '1D'
    }
};
