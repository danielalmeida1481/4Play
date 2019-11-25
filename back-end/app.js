var express = require('express');
var app = express();
var db = require('./db');

app.use(function(req, res, next) {
    // var allowedOrigins = ['http://localhost:3000', 'http://192.168.56.1:3000', 'http://192.168.1.64:3000'];
    // var origin = req.headers.origin;
    // if(allowedOrigins.indexOf(origin) > -1){
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorize-Token")
    next()
})

var authController = require('./api/controllers/authController')
var userController = require('./api/controllers/userController')
var groupController = require('./api/controllers/groupController')

app.use('/api/auth', authController)
app.use('/api/user', userController)
app.use('/api/group', groupController)

app.get('*', function(req, res){
    res.json({ error: true, message: 'Invalid method' })
});

module.exports = app;