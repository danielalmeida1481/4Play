'use strict';
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser');
var userModel = require('../models/userModel');
var config = require('../config');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// LOGIN
router.post('/login', async function (req, res) {
    const user = await userModel.findByCredentials(req.body.email, req.body.password)

    if (!user) {
        return res.status(200).send({ error: true, message: 'Invalid login credentials' })
    }

    var token = jwt.sign({ id: user._id }, config.jwtSecret, {
        expiresIn: 86400 // expires in 24 hours
    })

    return res.status(200).send({ error: false, token: token, userName: user.name })
});

// REGISTER
router.post('/register', async function (req, res) {
    var newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        isMale: req.body.isMale
    })

    newUser.validate(function(err) {
        if (err !== null && err.length) {
            return res.status(200).send({error: true, data: validate.errors})
        }
    })
    
    if (newUser.password != newUser.confirmPassword) {
        return res.status(200).send({ error: true, message: "Password and Confirm Password don't match" })
    }

    const user = await userModel.find({email: req.body.email})
    if (user.length) {
        return res.status(200).send({ error: true, message: 'Email already in use' })
    }
    
    userModel.create(newUser,
    function (err, user) {
        if (err) return res.status(200).send({error:true, data:err.errors})
        
        var token = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        })

        return res.status(200).send({ error: false, token: token })
    })
})

module.exports = router;