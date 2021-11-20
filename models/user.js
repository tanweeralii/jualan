const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

var userSchema = new Schema({
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
    password: {
        type: String, 
        required: true
    }
})

userSchema.pre('save', function(nebxt){
    var user = this
    if(this.isModified('password')||this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    return next(err)
                }
                user.password=hash;
                next();
            })
        })
    }
    else{
        return next()
    }
})

module.exports = mongoose.model('User', userSchema)