const mongoose = require('mongoose');
const data = require('../../data.json');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');

const controllers = {
    index: (req, res) => {
        console.log(req.params)
        res
            .status(200)
            .json({
                data: data
            })
    },

    // find: (req, res) => {
    //     console.log(typeof req.params.username)

    //     const queryUsername = req.params.username
        
    //     //data is the obj, users is the array and filter go trough the entire array.
    //     const user = data.users.filter(user => {
    //         // username is from the obj(What'm looking for)
    //         return user.username === queryUsername
    //     })
    //     console.log(user)
    //     res
    //         .status(200)
    //         .json({
    //             data: user
    //         })
    // },
    
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

                newUser
                  .save()
                  .then(saved => {
                    res.status(200)
                      .json({
                        message: "User created successfully",
                        data: saved
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

      findBy: (req, res) => {
        User.findById(req.params.userId).exec()
          .then(data => res.status(200).json({ type: 'Get User by Id', data: data }))
          .catch(e => res.status(500).json(e))
      },
      
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