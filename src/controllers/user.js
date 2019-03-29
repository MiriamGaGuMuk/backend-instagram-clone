const mongoose = require('mongoose');
const data = require('../../data.json')

const controllers = {
    index: (req, res) => {
        console.log(req.params)
        res
            .status(200)
            .json({
                data: data
            })
    },

    find: (req, res) => {
        console.log(typeof req.params.username)

        const queryUsername = req.params.username
        
        //data is the obj, users is the array and filter go trough the entire array.
        const user = data.users.filter(user => {
            // username is from the obj(What'm looking for)
            return user.username === queryUsername
        })
        console.log(user)
        res
            .status(200)
            .json({
                data: user
            })
    }


}

//exportar
module.exports = controllers;
