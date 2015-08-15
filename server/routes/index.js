'use strict';

var express = require('express');
var router = express.Router();
// var app = express();
var challenge_routes = require('./challenge_routes');
var challenger_routes = require('./challenger_routes');
var image_routes = require('./image_routes');
var user_routes = require('./user_routes');
var user_friend_routes = require('./user_friend_routes');
var fbauth_routes = require('./fbauth_routes');
var message_routes = require('./message_routes');
var image_s3_routes = require('./image_s3_routes');

router.use('/challenges', challenge_routes);
router.use('/challengers', challenger_routes);
router.use('/images', image_routes);
router.use('/users', user_routes);
router.use('/user_friends', user_friend_routes);
router.use('/fbauth_routes', fbauth_routes);
router.use('/message', message_routes);
router.use('/upload', image_s3_routes);

module.exports = router;