// ./src/index.js
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const UsersController = require('./users/controllers/users.controller');
const mongoose = require('mongoose');

// defining the Express app
const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.post('/users', [
	UsersController.insert
]);
app.get('/users/:userId', [
    UsersController.getById
]);

app.patch('/users/:userId', [
    UsersController.patchById
]);    

app.get('/usersList', [
    UsersController.list
]);

app.delete('/users/:userId', [
    UsersController.removeById
]);

const uri ="mongodb+srv://bunny99143:Sumit007@mern.4qul5.mongodb.net/user-management?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => console.log(`Connected to node-with-mongo...`))
        .catch((err) => console.log(`Not-Connected to node-with-mongo... ${err.message}`));

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});