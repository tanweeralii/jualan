const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

var businessSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: "Full Name Required"
    },
    email: {
        type: String,
        unique: true,
        lowercase: true, 
        required: "Please Enter Email",
        trim: true,
        validate: [validator.isEmail, "Enter correct email Id"]
    },
    address: {
        type: String, 
        trim: true, 
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    tokopedia: {
        type: Number,
        required: true
    },
    shopee: {
        type: Number,
        required: true
    },
    goshop: {
        type: Number,
        required: true
    },
    grabmarket: {
        type: Number,
        required: true
    },
    blibli: {
        type: Number,
        required: true
    },
    bukalapak: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Business', businessSchema)