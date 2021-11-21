const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

var productSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: "Product Name Required"
    },
    category: {
        type: String,
        unique: true, 
        required: "Please Enter Email",
        trim: true,
    },
    price: {
        type: Number,
        trim: true,
        required: "Price Required"
    },
    stocks: {
        type: Number,
        trim: true,
        required: "Product Available Stocks Required"
    },
    minorder: {
        type: Number,
        trim: true,
        required: "Min Order Required"
    },
    desc: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('Product', productSchema)