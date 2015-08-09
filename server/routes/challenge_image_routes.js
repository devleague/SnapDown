'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').ChallengeImage;

router.get('/', function(req,res) {

  db.findAll()

    .then(function(results) {

      res.json(results);
    });
});

router.get('/:id', function(req,res) {

  db.findOne({

    where: {

      challenge_image_id: req.params.id
    }

  }).then(function(result) {

    if(result) {

      res.json(result);

    } else {

      res.status(404);
      res.send("Could not locate the requested resource.");
    }
  })
});

router.post('/', function(req,res) {

  db.create({

    user_id: req.body.user_id,
    image_id: req.body.image_id,
    challenge_id: req.body.challenge_id

  }).then(function(result) { //may be unnecessary

    res.status(200).json(result);
  });
});

router.put('/:id', function(req,res) {

  db.findOne({

    where: {

      challenge_image_id: req.params.id
    }

  }).then(function(result){

    if(!result) {

      res.status(404);
      res.send("Could not locate the requested resource.");
    }

    var updateData = {};

    if(req.body.user_id !== undefined) {

      updateData.user_id = req.body.user_id;
    }

    if(req.body.image_id !== undefined) {

      updateData.image_id = req.body.image_id;
    }

    if(req.body.challenge_id !== undefined) {

      updateData.challenge_id = req.body.challenge_id;
    }

    result.updateAttributes(updateData).then(function(result) {

      res.status(200);
      res.json(result);
    });
  });
});

router.delete('/:id', function(req,res) {

  var id = req.params.id;

  db.findOne({

    where: {

      challenge_image_id: id
    }

  }).then(function(result) {

    if(!result) {

      res.status(404);
      res.send("Could not locate the requested resource.");

    } else {

      result.destroy().then(function() {

        res.status(200).send();
      });
    }
  });
});

module.exports = router;