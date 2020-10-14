const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const { handleError } = require('../helpers/error-handler');

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

    app.use(express.static('./public'))
    app.use('/api/post', require('../app/routes/post.routes')());
    app.use('/api/images', require('../app/routes/images.routes')());
    app.use('/api/user', require('../app/routes/user.routes')());

    app.use((err, req, res, next) => {
        handleError(err, res);
    });



    return server;
};
