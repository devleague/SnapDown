'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Challenger;
var challenge = require('../models').Challenge;

router.get('/', function(req,res) {

  db.findAll()

    .then(function(results) {

      res.json(results);
    });
});

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
  })
});

router.get('/:id/challenges', function(req,res) {

  console.log("HERE!!!!!! " + req.params.id);

  db.findAll({

    where: { user_id: req.params.id }/*,
    include :[
      { model:challenge}]*/

  }).then(function(challengers) {

    res.json(challengers);
  });
});

router.post('/', function(req,res) {

  db.create({

    challenge_id: req.body.challenge_id,
    user_id: req.body.user_id,
    image_id: req.body.image_id

  }).then(function(result) { //may be unnecessary

    res.status(200).json(result);
  });
});

router.put('/:id', function(req,res) {

  db.findOne({

    where: {

      id: req.params.id
    }

  }).then(function(result){

    if(!result) {

      res.status(404);
      res.send("Could not locate the requested resource.");
    }

    var updateData = {};

    if(req.body.challenge_id !== undefined) {

      updateData.challenge_id = req.body.challenge_id;
    }

    if(req.body.user_id !== undefined) {

      updateData.user_id = req.body.user_id;
    }

    if(req.body.image_id !== undefined) {

      updateData.image_id = req.body.image_id;
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

      id: id
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