const express = require('express')
const actions = require('./../src/actions')
const router = express.Router();

router.post('/login', actions.authenticate)

router.post('/addUser', actions.addNew)

router.get('/profile', actions.getProfile)

router.post('/addBusiness', actions.addBusiness)

router.post('/addProduct', actions.addProduct)

router.post('/otp', actions.verifyOTP)

router.put('/updateBusiness', actions.UpdateBusiness)

/*
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
*/

module.exports = router