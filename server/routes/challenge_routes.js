'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Challenge;

router.get('/', function(req,res) {

  db.findAll()

    .then(function(results) {

      res.json(results);
    });
});

router.get('/:id', function(req,res) {

  db.findOne({

    where: {

      challenge_id: req.params.id
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
    start_at: req.body.start_at,
    expire_at: req.body.expire_at,
    name: req.body.name

  }).then(function(result) { //may be unnecessary

    res.status(200).json(result);
  });
});

router.put('/:id', function(req,res) {

  db.findOne({

    where: {

      challenge_id: req.params.id
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

    if(req.body.start_at !== undefined) {

      updateData.start_at = req.body.start_at;
    }

    if(req.body.expire_at !== undefined) {

      updateData.expire_at = req.body.expire_at;
    }

    if(req.body.name !== undefined) {

      updateData.name = req.body.name;
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

      challenge_id: id
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