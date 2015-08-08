'use strict';

var express = require('express');
// var router = express.Router();
var app = express();
var challenge_routes = require('./challenge_routes');
var challenge_image_routes = require('./challenge_image_routes');
var challenge_user_routes = require('./challenge_user_routes');
var image_routes = require('./image_routes');
var user_routes = require('./user_routes');
var user_friend_routes = require('./user_friend_routes');
// var bodyParser = require('body-parser');
// var Challenge = require('../models/Challenge').Challenge;
// var ChallengeImage = require('../models/ChallengeImage').ChallengeImage;
// var ChallengeUser = require('../models/ChallengeUser').ChallengeUser;
// var Image = require('../models/Image').Image;
// var User = require('../models/User').User;
// var UserFriend = require('../models/UserFriend').UserFriend;

// router.use(function(req,res,next) {

//   console.log(req.url);
//   next();
// })

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/challenges', challenge_routes);
app.use('/api/challenge_images', challenge_image_routes);
app.use('/api/challenge_users', challenge_user_routes);
app.use('/api/images', image_routes);
app.use('/api/users', user_routes);
app.use('/api/user_friends', user_friend_routes);

module.exports = router;