'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Challenge;
var images = require('../models').Image;
var challengers = require('../models').Challenger;
var users = require('../models').User;
var user_stats = require('../models').UserStatistics;

router.post('/', function(req, res) {

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
				res.json({
					id: user.id,
					registered: true
				});
			})
		} else {
			res.json({
				id: result.id,
				registered: false
			});
		}
	})
});

/**
 *  Not sure if GET request.  Need to figure out how to pass
 *  Objects in GET request.  Leaving POST for now. - Kawika
 */
router.post('/info', function(req, res) {
  users.findOne({
    where: {
      id: req.body.id
    },
    include: [{
      model: challengers,
      include: [{
        model: images
      }]
    }]

	}).then(function(facebookInfo) {
		if (facebookInfo) {
			var stat_started = 0;
			var stat_received = 0;
			var stat_accepted = 0;
			var stat_rejected = 0;

			// console.log('facebookInfo', facebookInfo);

			for (var i = 0; i < facebookInfo.Challengers.length; i++) {
				if (facebookInfo.Challengers[i].initiator_flag) {
					stat_started++;
				} else {
					stat_received++;
				}
				if (facebookInfo.Challengers[i].Image) {
					stat_accepted++;
				} else {
					stat_rejected++;
				}
			}
			var userInfo = {
				id: facebookInfo.id,
				first_name: facebookInfo.first_name,
				last_name: facebookInfo.last_name,
				email: facebookInfo.email,
				picture: facebookInfo.facebook_image_url,
				challenge_start_count: stat_started,
				challenge_received_count: stat_received,
				challenge_accepted_count: stat_accepted,
				challenge_rejected_count: stat_rejected
			};
			res.json(userInfo);
		} else {
			res.status(404).send('Invalid post');
		}
	})
});


module.exports = router;