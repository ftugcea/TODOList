const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoList = new Schema({
    name: {
        type: String
    }
}, {timestamps: true})

const Liste = mongoose.model('Liste', todoList)
module.exports = Liste