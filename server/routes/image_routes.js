'use strict';

var express = require('express');
var router = express.Router();
// var Image = require('../models/Image').Image;

router.get('/', function(req,res) {

  db.findAll()

    .then(function(error, results) {

      res.json(results);
    });
});

router.get('/:id', function(req,res) {

  db.findOne({

    where: {

      image_id: req.params.id
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

    // user_id: req.body.user_id,
    // start_at: req.body.start_at,
    // expire_at: req.body.expire_at,
    // name: req.body.name

  }).then(function(result) { //may be unnecessary

    res.status(200).json(result);
});

router.put('/:id', function(req,res) {

  db.findOne({

    where: {

      image_id: req.params.id
    }

  }).then(function(result){

    if(!result) {

      res.status(404);
      res.send("Could not locate the requested resource.");
    }

    // if(req.body.user_id !== undefined) {

    //   result.dataValues.user_id = req.body.user_id;
    // }

    // if(req.body.start_at !== undefined) {

    //   result.dataValues.start_at = req.body.start_at;
    // }

    // if(req.body.expire_at !== undefined) {

    //   result.dataValues.expire_at = req.body.expire_at;
    // }

    // if(req.body.name !== undefined) {

    //   result.dataValues.name = req.body.name;
    // }

    result.save({

      // fields: ['user_id','start_at','expire_at','name']

    }).then(function(result) {

      res.status(200);
      res.send(result);
    });
  });
});

router.delete('/:id', function(req,res) {

  var id = req.params.id;

  db.findOne({

    where: {

      image_id: id
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