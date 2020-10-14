// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// process.env.NODE_PORT = process.env.NODE_PORT || '4646';
// const server = require('./config/express')();

// server.listen(process.env.NODE_PORT, 'localhost', (req, res) => {
//     console.log('Node server running port : ' + process.env.NODE_PORT);
// });
const express = require('express');
const app = express();

app.use(express.json());
app.get('/', (req,res) => {
    res.send('Welcome to Daily Code Buffer in Heroku Auto Deployment!!');
})
const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));