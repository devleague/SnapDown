'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').User;

router.get('/', function(req,res) {

  db.findAll()

    .then(function(results) {

      res.json(results);
    });
});

router.get('/:id', function(req,res) {

  db.findOne({

    where: {

      user_id: req.params.id
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

    first_name: req.body.first_name,
    last_name: req.body.last_name,
    facebook_id: req.body.facebook_id,
    facebook_image_url: req.body.facebook_image_url,
    email: req.body.email,
    phone: req.body.phone

  }).then(function(result) { //may be unnecessary

    res.status(200).json(result);
  });
});

router.put('/:id', function(req,res) {

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

    if(req.body.first_name !== undefined) {

      updateData.first_name = req.body.first_name;
    }

    if(req.body.last_name !== undefined) {

      updateData.last_name = req.body.last_name;
    }

    if(req.body.facebook_id !== undefined) {

      updateData.facebook_id = req.body.facebook_id;
    }

    if(req.body.facebook_image_url !== undefined) {

      updateData.facebook_image_url = req.body.facebook_image_url;
    }

    if(req.body.email !== undefined) {

      updateData.email = req.body.email;
    }

    if(req.body.phone !== undefined) {

      updateData.phone = req.body.phone;
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

      user_id: id
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