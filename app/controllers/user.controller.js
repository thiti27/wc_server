const soap = require('soap');
const config = require('../../config/config');
var clientUser, clientEmployee;

soap.createClientAsync(config.env.edsServiceConfig.urlUser).then(c => clientUser = c);
soap.createClientAsync(config.env.edsServiceConfig.urlEmployee).then(c => clientEmployee = c);

exports.login = (username, password, done) => {
    try {
        clientUser.login({
            username: username,
            password: password,
        }, function (err, result) {
            if (err) {
                return done(err);
            }

            if (result.return) {
                clientEmployee.getEmployeeByEmId({
                    emId: username
                }, function (err, result) {
                    if (err) {
                        return done(err);
                    }

                    // if (err) { return done(err); }
                    // if (!user) { return done(null, false, { message: 'ไม่พบชื่อผู้ใช้งาน' }); }
                    // if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'รหัสผ่านไม่ถูกต้อง' }); }

                    // res.json(result.return);
                    // user.password = null;

                    return done(null, result.return);
                });
            } else {
                return done(null, false, { isLogin: false });
            }
        });
    } catch (err) {
        next(err);
    }
};