const express = require('express')
const router = express.Router();

router.post('/login', (req,res) => {
    res.json({
        message: "Sucess"
    })
})

router.post('/addUser', (req,res) => {
    res.json({
        message: "Sucess"
    })
})

router.post('/otp', (req,res) => {
    res.json({
        message: "Sucess"
    })
})

router.post('/:id/addBusiness', (req,res) => {
    res.json({
        message: "Sucess"
    })
})

router.post('/:id/addProduct', (req,res) => {
    res.json({
        message: "Sucess"
    })
})

router.post('/:id/updateProfile', (req,res) => {
    res.json({
        message: "Sucess"
    })
})

router.post('/:id/updateProduct', (req,res) => {
    res.json({
        message: "Sucess"
    })
})

router.post('/:id/updateBusiness', (req,res) => {
    res.json({
        message: "Sucess"
    })
})

module.exports = router