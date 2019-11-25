'use strict'
var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var config = require('../config')

var userModel = require('../models/userModel')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


var decodedToken;
router.all('/*', async function (req, res, next) {
    var authorizeToken = req.headers['authorize-token'] || req.headers['Authorize-Token']

    try {
        decodedToken = jwt.verify(authorizeToken, config.jwtSecret)

        var user = await userModel.findById(decodedToken.id)

        if (user) {
            next()
        } else {
            return res.status(200).send({ error: true, message: "Invalid Authorize Token" })
        }

    } catch(err) {
        return res.status(200).send({ error: true, message: "Invalid Authorize Token" })
    }
});

router.get('/', function (req, res) {
    res.redirect(`/api/user/${decodedToken.id}`)
})

router.get('/all', async function (req, res) {
    var users = await userModel.find({}, 'name isMale')

    return res.status(200).send({ error: false, data: users })
})

router.get('/:userId', async function (req, res) {
    var userId = req.params['userId']

    try {
        var user = await userModel.findById(userId, 'name isMale')

        if (!user) {
            return res.status(200).send({ error: true, message: "No user found" })
        }
    
        return res.status(200).send({ error: false, data: user })
    } catch (error) {
        return res.status(200).send({ error: true, message: "Invalid id" })
    }
})

module.exports = router