'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Challenge;
var images = require('../models').Image;
var challengers = require('../models').Challenger;
var users = require('../models').User;

router.post('/', function(req, res) {
	console.log(req.body);

	users.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		facebook_id:req.body.id,
		facebook_image_url:req.body.picture,
		email:req.body.email,
	});

	res.send('user created');
});


module.exports = router;