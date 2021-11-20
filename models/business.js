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
        type: string,
        unique: true,
        lowercase: true, 
        required: "Please Enter Email",
        trim: true,
        validate: [validator.isEmail, "Enter correct email Id"]
    },
    address: {
        type: string, 
        trim: true, 
        required: true
    },
    phone: {
        type: string,
        trim: true,
        required: true
    },
    tokopedia: {
        type: int,
        required: true
    },
    shopee: {
        type: int,
        required: true
    },
    goshop: {
        type: int,
        required: true
    },
    grabmarket: {
        type: int,
        required: true
    },
    blibli: {
        type: int,
        required: true
    },
    bukalapak: {
        type: int,
        required: true
    },
    image: {
        type: string,
        required: true
    }
})

module.exports = mongoose.model('Business', businessSchema)