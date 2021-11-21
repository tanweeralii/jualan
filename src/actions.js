var User = require('./../models/user')
const nodemailer = require('nodemailer')
var Business = require('./../models/business')
var Product = require('./../models/product')
var Verification = require('./../models/verification')
var jwt = require('jwt-simple')
var config = require('./database/dbConfig')

var otp = Math.random()
otp = otp*100000;
otp = parseInt(otp)

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: "tanweeralii908@gmail.com",
      pass: "glduwawigepqsfcc",
    }
    
});

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
                    var mailOptions={
                        to: req.body.email,
                        subject: "Otp for registration is: ",
                        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
                    };
                     
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);   
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    });
                    res.json({
                        success: true,
                        msg: 'OTP Required',
                    })
                }
            })
        }
    },
    verify: function(req,res){
        if(req.body.otp==otp){
            res.send("You has been successfully registered");
        }
        else{
            res.render('otp',{msg : 'otp is incorrect'});
        }
    },
    resend: function(req,res){
        var mailOptions={
            to: req.email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
        };
         
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.render('otp',{msg:"otp has been sent"});
        });
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
        if(req.headers.authorization){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                var newBusiness = Business({
                    user: decodetoken._id,
                    name: req.name,
                    email: req.email,
                    address: req.address,
                    phone: req.phone,
                    tokopedia: req.tokopedia,
                    shopee: req.shopee,
                    goshop: req.goshop,
                    grabmarket: req.grabmarket,
                    blibli: req.blibli,
                    bukalapak: req.bukalapak
                })
                newBusiness.save(function(err, newUser){
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Failed to Save'
                        })
                    }
                    else{
                        res.json({
                            success: true,
                            msg: 'Successfully Saved',
                        })
                    }
                })
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
        if(req.headers.authorization){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                var newProduct =Product({
                    user: decodetoken._id,
                    name: req.name,
                    category: req.category,
                    price: req.price,
                    stocks: req.stocks,
                    minorder: req.minorder,
                    desc: req.desc
                })
                newProduct.save(function(err, newUser){
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Failed to Save'
                        })
                    }
                    else{
                        res.json({
                            success: true,
                            msg: 'Successfully Saved',
                        })
                    }
                })
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
    getProfile: function (req, res) {
        if(req.headers.authorization){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                User.find({
                    _id: decodetoken._id
                }, 
                function(err, user){
                    if(err){
                        console.log("no data found");
                    }
                    else{
                        res.json(user)
                    }
                })
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
    getBusiness: function (req, res) {
        if(req.headers.authorization){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                
                Business.find({
                    user: decodetoken._id
                }, 
                function(err, details){
                    if(err){
                        console.log("no data found")
                    }
                    else{
                        return res.json(details)
                    }
                })
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
    getVerification: function (req, res) {
        if(req.headers.authorization){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                Verification.find({
                    user: decodetoken._id
                }, 
                function(err, details){
                    if(err){
                        console.log("no data found")
                    }
                    else{
                        return res.json(details)
                    }
                })
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
    getProduct: function (req, res) {
        if(req.headers.authorization){
            try{
                var token = req.headers.authorization.split(' ')[0]
                var decodetoken = jwt.decode(token ,config.secret)
                Product.find({
                    user: decodetoken._id
                }, 
                function(err, details){
                    if(err){
                        console.log("no data found");
                    }
                    else{
                        res.json(details)
                    }
                })
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
        if(req.headers.authorization){
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
