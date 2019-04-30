const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  
  profile: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

module.exports = mongoose.model('User', userSchema)
