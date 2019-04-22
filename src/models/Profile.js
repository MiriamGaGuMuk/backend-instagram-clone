const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/User')

const profileSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    publishing: {
        type: Number
    },
    followers: {
        type: Number
    },
    following: {
        type: Number
    },

    description: {
        type: String
    },
    // photo: {
    //     type: String,
    //     required: true
    // },

    username: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: Schema.Types.ObjectId, ref: 'User' },
    userid: { type: Schema.Types.ObjectId, ref: 'User' }



})

module.exports = mongoose.model('Profile', profileSchema)
