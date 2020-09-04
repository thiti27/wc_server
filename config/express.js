const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
// const realtime = require('../app/controllers/realtime.controller');
// const UserController = require('../app/controllers/user.controller');
const cors = require('cors');
const passport = require('passport');
const jwt = require('./jwt');
const { handleError } = require('../helpers/error-handler');
require('./passport');

module.exports = () => {
    const app = express();
    const server = require('http').createServer(app);

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(compression());
    }
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    app.use(bodyParser.json());
    // app.use(validator());
    app.use(cors());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    // realtime.connect(server, '/tracking-system', (req, res, next) => {
    //     next();
    // });

    app.use(passport.initialize());

    app.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (user) return res.json({ 'token': jwt.generateJwt(), 'userLogin': user });
            return res.json(info);
        })(req, res);
    });
    app.use(express.static('./public'))

    app.use('/api/post', require('../app/routes/post.routes')());
    app.use('/api/images', require('../app/routes/images.routes')());
    

    app.use((err, req, res, next) => {
        handleError(err, res);
    });


    return server;
};
