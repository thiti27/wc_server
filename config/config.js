const env = require('./env/' + process.env.NODE_ENV + '.js');

module.exports = {
    env: env
};
