'use strict';
const mongoose = require('mongoose')
const validator = require('validator')
const userModel = require('./userModel')

var groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [30, "Name can't have more than 30 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1024,
        default: "Sem descrição"
    },
    members: [mongoose.Schema.Types.ObjectId],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdIn: {
        type: Date,
        default: Date.now
    }
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group