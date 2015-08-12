'use strict';

var express = require('express');
var router = express.Router();
// var app = express();
var challenge_routes = require('./challenge_routes');
var challenger_routes = require('./challenger_routes');
var image_routes = require('./image_routes');
var user_routes = require('./user_routes');
var user_friend_routes = require('./user_friend_routes');
// var bodyParser = require('body-parser');

// router.use(function(req,res,next) {

//   console.log(req.url);
//   next();
// })

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

router.use('/challenges', challenge_routes);
router.use('/challengers', challenger_routes);
router.use('/images', image_routes);
router.use('/users', user_routes);
router.use('/user_friends', user_friend_routes);

module.exports = router;