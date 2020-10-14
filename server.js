process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_PORT = process.env.NODE_PORT || '4646';
const server = require('./config/express')();

server.listen(process.env.NODE_PORT, 'localhost', (req, res) => {
    console.log('Node server running port : ' + process.env.NODE_PORT);
});

