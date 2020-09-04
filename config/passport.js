const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserController = require('../app/controllers/user.controller');

passport.use(
    new localStrategy((username, password, done) => {
        UserController.login(username, password, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { isLogin: false }); }
            // if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'รหัสผ่านไม่ถูกต้อง' }); }

            user.password = null;
            return done(null, user);
        });
    })
);