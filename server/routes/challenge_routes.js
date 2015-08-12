'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Challenge;
var images = require('../models').Image;
var challengers = require('../models').Challenger;

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
  });
});

router.get('/:id/images', function(req,res) {

  console.log("HERE!!!!");

  db.findOne({

    where: {

      id: req.params.id
    }, include :[{model:challengers}]

  }).then(function(result) {

    res.json(result);

    if(!result) {

      res.status(404);
      res.send("Could not locate the requested resource.");
    }

    challengers.findAll( {

      where: {

        challenger_id: result.id
      }

    }).then(function(results) {


    });
  });
});

router.post('/', function(req,res) {

  db.create({

    start_at: req.body.start_at,
    expire_at: req.body.expire_at,
    name: req.body.name,
    privacy_status: req.body.privacy_status,
    challenger_id: req.body.challenger_id

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

    if(req.body.start_at !== undefined) {

      updateData.start_at = req.body.start_at;
    }

    if(req.body.expire_at !== undefined) {

      updateData.expire_at = req.body.expire_at;
    }

    if(req.body.name !== undefined) {

      updateData.name = req.body.name;
    }

    if(req.body.privacy_status !== undefined) {

      updateData.privacy_status = req.body.privacy_status;
    }

    if(req.body.challenger_id !== undefined) {

      updateData.challenger_id = req.body.challenger_id;
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