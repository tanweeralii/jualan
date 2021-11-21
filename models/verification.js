const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

var verificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    idNumber: {
        type: String,
        trim: true,
        required: "Full Name Required"
    },
    address: {
        type: String,
        unique: true,
        lowercase: true, 
        required: "Please Enter Your Address",
        trim: true,
    },
    dob: {
        type: String, 
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: "Phone Number Required"
    },
    idPic: {
        type: String,
        required: true
    },
    PicWithId: {
        type: String,
        required: true
    }    
})

module.exports = mongoose.model('Verification', verificationSchema)