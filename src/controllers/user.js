const mongoose = require('mongoose');
// const data = require('../../data.json');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const Profile = require ('../models/Profile')

const controllers = {
    index: (req, res) => {
     User
     .find({})
     .exec()
     .then(users => {
        res
        .status(200)
        .json({
          data: users
        })
      })
     .catch(err => console.log('Error'))
    },

    find: (req, res) => {
      User.find({username: req.params.username})
        .exec()
        .then(user => {
          res
          .status(200)
          .json({
            data: user
          })
        })
        .catch(err => console.log('No user found'))
    
},

findByProfile: (req, res) => {
  console.log('Finding by profile')
  
  User

  .find({username: req.params.username})
  .select('profile')
  .populate('profile')
  .exec()
  .then(user => {
    res
    .status(200)
    .json({
      data: user
    })
  })
  .catch(err => console.log(err))
},
    
    signup: (req, res) => {
        User
          .find({ email: req.body.email })
          .exec()
          .then(users => {
            if (users.length < 1) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  res.status(500)
                    .json({ message: err })
                }
      
                const newUser = new User({
                  _id: new mongoose.Types.ObjectId(),
                  email: req.body.email,
                  name: req.body.name,
                  username: req.body.username, 
                  password: hash
                })

                const newProfile = new Profile({
                  _id: new mongoose.Types.ObjectId(),
                  publishing: 0,
                  followers: 0,
                  following: 0,
                  description: ''
                })

                newUser
                  .save()
                  .then(userCreated => {
                    newProfile.save().then(profileCreated => {
                      newUser.profile = newProfile._id
                      newUser.save()
                      res.status(200)
                      .json({
                        message: 'User Created',
                        data: userCreated
                      })
                    })
                   
                  })
              })
            } else {
              res.status(422) // ya existe ese obj
                .json({
                  message: 'User already exist.'
                })
            }
          })
      },

      // findBy: (req, res) => {
      //   User.findById(req.params.userId).exec()
      //     .then(data => res.status(200).json({ type: 'Get User by Id', data: data }))
      //     .catch(e => res.status(500).json(e))
      // },
      
    // login: (req, res) => {
    //     User.find({ email: req.body.email }).exec()
    //       .then(user => {
    //         if (user.length > 0) {
    //           //comparing passwords
      
    //           bcrypt.compare(req.body.password, (error, result) => {
    //             if (result) {
    //               return res.status(200).json({ message: "Authnetication Succed" })
    //             }     
    //           })
    //         } else {
    //           res.status(422).json({ message: "Authnetication Failed" })
    //         }
      
    //       })
    //   }
      signin: () => {
        passport.authenticate('google', {
          scope: ['profile']
        })

      }, 
      redirect: (req, res) =>{
        res.send('You reached the callback URI')
      }
      
      




}

//exportar
module.exports = controllers;

// bcrypt.compare(req.body.password, user[0].password, (error, result) => {