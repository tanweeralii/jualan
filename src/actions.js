var User = require('./../models/user')
var Business = require('./../models/business')
var Product = require('./../models/product')
var Verification = require('./../models/verification')
var jwt = require('jwt-simple')
var config = require('./database/dbConfig')

const functions = {
    addNew: function(req,res){
        if(!req.body.name || !req.body.password || !req.body.email){
            res.json({
                success: false,
                mag: "Enter all Fields"
            })
        }
        else{
            var newUser = User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
            newUser.save(function(err, newUser){
                if(err){
                    res.json({
                        success: false,
                        msg: 'Failed to Save'
                    })
                }
                else{
                    res.json({
                        success: true,
                        msg: 'OTP Required'
                    })
                }
            })
        }
    },
    authenticate: function(req,res){
        User.findOne({
            email: req.body.email
        }, 
        function(err, user){
            if(err){
                res.json({
                    success: false,
                    msg: "Authentication Failed"
                });
            }
            if(!user){
                res.status(403).send({success: false, msg: "User not Found"});
            }
            else{
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(!err&&isMatch){
                        var token = jwt.encode(user, config.secret)
                        res.json({
                            success: true,
                            token: token
                        })
                    }
                    else{
                        res.status(403).send({
                            success: false,
                            msg: "Authentication Failed! Wrong Password"
                        })
                    }
                })
            }
        })
    },
    addBusiness: function(req, res){
        if(req.headers.authorization.split(' ')[0]){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                return res.json({
                    success: true,
                    msg: 'Hello ' + decodetoken._id
                });
            } catch(err){
                res.status(400).json({ message: "Invalid token" })
            }
        }
        else{
            res.send({
                success: false,
                msg: "No Headers"
            })
        }
    },
    addProduct: function(req, res){
        if(req.headers.authorization.split(' ')[0]){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                return res.json({
                    success: true,
                    msg: 'Hello ' + decodetoken._id
                });
            } catch(err){
                res.status(400).json({ message: "Invalid token" })
            }
        }
        else{
            res.send({
                success: false,
                msg: "No Headers"
            })
        }
    },
    getProfile: function(req, res){
        if(req.headers.authorization.split(' ')[0]){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                return res.json({
                    success: true,
                    msg: 'Hello ' + decodetoken._id
                });
            } catch(err){
                res.status(400).json({ message: "Invalid token" })
            }
        }
        else{
            res.send({
                success: false,
                msg: "No Headers"
            })
        }
    },
    verifyOTP: function(req, res){
        if(req.headers.authorization.split(' ')[0]){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                return res.json({
                    success: true,
                    msg: 'Hello ' + decodetoken.name
                });
            } catch(err){
                res.status(400).json({ message: "Invalid token" })
            }
        }
        else{
            res.send({
                success: false,
                msg: "No Headers"
            })
        }
    },
    UpdateBusiness: function(req, res){
        if(req.headers.authorization.split(' ')[0]){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                return res.json({
                    success: true,
                    msg: 'Hello ' + decodetoken._id
                });
            } catch(err){
                res.status(400).json({ message: "Invalid token" })
            }
        }
        else{
            res.send({
                success: false,
                msg: "No Headers"
            })
        }
    },
}

module.exports = functions
