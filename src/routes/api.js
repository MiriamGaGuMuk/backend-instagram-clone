const { Router } = require('express');
const app = Router();
const Users = require('../controllers/user');


//Users routes
app.get('/users', Users.index);
// app.get('/users/:username', Users.find);
app.get('/users/:userId', Users.findBy);
// app.post('users', Users.create)
// app.get('/users/:username', Users.profile)

//Profile
//app.posts

//Authentication
app.post('/auth/signup', Users.signup)
// app.post('/auth/login', Users.login)


module.exports = app;