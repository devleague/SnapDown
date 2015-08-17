'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').UserStatistics;

router.get('/:id', function(req,res) {
  db.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    if(result) {
      res.json(result);
    } else {
      res.status(404);
      res.send("Could not locate the requested resource.");
    }
  });
});

router.post('/', function(req,res) {

  db.create({

    challenges_started: req.body.challenges_started,
    challenges_accepted: req.body.challenges_accepted,
    challenges_declined: req.body.challenges_declined,
    user_id: req.body.user_id

  }).then(function(result) {

    res.status(200).json(result);
  });
});

router.put('/:id', function (req, res){

  db.findOne({

    where: {

      user_id: req.params.id
    }

  }).then(function(result){

      if(!result) {
        res.status(404);
        res.send("Could not locate the requested resource.");
      }

      var updateData = {};

      if(req.body.challenges_started !== undefined) {
        updateData.challenges_started++;
      }

      if(req.body.challenges_accepted !== undefined) {
        updateData.challenges_accepted++;
      }

      if(req.body.challenges_declined !== undefined) {
        updateData.challenges_declined++;
      }

      result.updateAttributes(updateData).then(function(result) {
      res.status(200);
      res.json(result);
    });
  });
});

module.exports = router;