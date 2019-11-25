'use strict'
var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var config = require('../config')

var groupModel = require('../models/groupModel')
var userModel = require('../models/userModel')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


var decodedToken, user
router.all('/*', async function (req, res, next) {
    var authorizeToken = req.headers['authorize-token'] || req.headers['Authorize-Token']

    try {
        decodedToken = jwt.verify(authorizeToken, config.jwtSecret)

        user = await userModel.findById(decodedToken.id)

        if (user) {
            next()
        } else {
            return res.status(200).send({ error: true, message: "Invalid Authorize Token" })
        }

    } catch(err) {
        return res.status(200).send({ error: true, message: "Invalid Authorize Token" })
    }
})

router.post('/', async function(req, res) {
    var newGroup = new groupModel({
        name: req.body.name,
        description: req.body.description,
        createdBy: decodedToken.id
    })

    newGroup.validate(function(err) {
        if (err !== null && err.length) {
            return res.status(200).send({error: true, data: validate.errors})
        }
    })
    
    groupModel.create(newGroup,
    function (err, group) {
        if (err) return res.status(200).send({error:true, data:err.errors})

        return res.status(200).send({ error: false, message: 'Group created successfully', groupId: group._id })
    })
})

router.get('/my', async function (req, res) {
    var groups = await groupModel
    .find({}, '_id name createdBy createdIn')
    .or([
        { createdBy: decodedToken.id }
    ])

    const returnGroupsAsync = groups.map(async item => {
        var createdBy = await userModel.findOne({ _id: item.createdBy }, '_id name')

        return {
            _id: item._id,
            groupName: item.name,
            groupCreatedBy: {
                _id: createdBy._id,
                name: createdBy.name
            },
            groupCreatedIn: item.createdIn
        }
    })

    const returnGroups = await Promise.all(returnGroupsAsync)

    return res.status(200).send({ error: false, data: returnGroups })
})

router.get('/:groupId', async function (req, res) {
    var groupId = req.params['groupId']

    try {
        var group = await groupModel.findById(groupId, 'name description members createdBy')

        if (!group) {
            return res.status(200).send({ error: true, message: "No group found" })
        }

        group.members.push(group.createdBy)

        const returnMembersAsync = group.members.map(async item => {
            var userInfo = await userModel.findById(item, 'name isMale')
    
            return {
                _id: item,
                name: userInfo.name,
                isMale: userInfo.isMale
            }
        })

        const membersInfo = await Promise.all(returnMembersAsync)

        const returnGroup = {
            name: group.name,
            description: group.description,
            members: membersInfo
        }
    
        return res.status(200).send({ error: false, data: returnGroup })
    } catch (error) {
        return res.status(200).send({ error: true, message: "Invalid id" })
    }
})

module.exports = router