const mongoose = require('mongoose')

const user = mongoose.Schema({
    email: {type: String, default: "", unique: true},
    name: {type: String, default: ""},
    password: {type: String, default: ""},
    token: {type: String, default: ""},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

const User = mongoose.model('User', user)

module.exports = User