const { Router } = require('express');
const app = Router();
const Users = require('../controllers/user');
const Profile = require('../controllers/profile');


//Users routes
app.get('/users', Users.index);
app.get('/users/:username', Users.find);
app.get('/users/:username/profile', Users.findByProfile);
// app.post('users', Users.create)
// app.get('/users/:username', Users.profile)


//Authentication
app.post('/auth/signup', Users.signup)
// app.post('/auth/login', Users.login)

//Auth Provider
app.get('/auth/google', Users.signin);
app.get('/auth/redirect', Users.redirect);
// app.post('/auth/facebook', Users.signin);


module.exports = app;