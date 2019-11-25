'use strict';
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email already in use'],
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: value => {
            if (!validator.isLength(value, 8, 16)) {
                throw new Error('Password must have 8-16 characters')
            }
        }
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required']
    },
    isMale: {
        type: Boolean,
        required: [true, 'Gender is required']
    },
    createdIn: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        user.confirmPassword = user.password
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email })
    if (!user) {
        return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        return null;
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User