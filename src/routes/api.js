const { Router } = require('express');
const app = Router();

const Users = require('../controllers/user');


//Users routes
app.get('/users', Users.index);
//Authentication
// app.post('/auth/signup', Users.signup)
// app.post('/auth/login', Users.login)


module.exports = app;