process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_PORT = process.env.NODE_PORT || '1343';
const server = require('./config/express')();

server.listen(process.env.NODE_PORT, (req, res) => {
    console.log('Node server running port : ' + process.env.NODE_PORT);
});