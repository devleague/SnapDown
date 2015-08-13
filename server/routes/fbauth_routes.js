'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Challenge;
var images = require('../models').Image;
var challengers = require('../models').Challenger;
var users = require('../models').User;

router.post('/', function(req, res) {
	console.log(req.body);

	users.findOne({
		where: {
			facebook_id: req.body.id
		}
	}).then(function(result) {
		if (!result) {
			users.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				facebook_id: req.body.id,
				facebook_image_url: req.body.picture,
				email: req.body.email,
			}).then(function(user) {
				console.log('---------------------------------');
				console.log('user added')
				console.log('---------------------------------');
				res.json(user);
			})
		} else {
			console.log('---------------------------------');
			console.log('user denied.  already in system')
			console.log('---------------------------------');

			res.send('user already in system');
		}
	})

});


module.exports = router;