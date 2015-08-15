'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').User;

//Gets all the users
router.get('/', function(req,res) {

console.log('database gimme the users');
  db.findAll()
    .then(function(results) {
      res.json(results);
    });
});

//Gets an individual user
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

//creates a new user
router.post('/', function(req,res) {
  db.create({

    user_name: req.body.user_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    facebook_id: req.body.facebook_id,
    facebook_image_url: req.body.facebook_image_url,
    email: req.body.email,
    phone: req.body.phone,
    device_token: req.body.device_token,
    service_provider: req.body.service_provider

  }).then(function(result) {

    res.status(200).json(result);
  });
});

//updates a user
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

    if(req.body.user_name !== undefined) {
      updateData.user_name = req.body.user_name;
    }

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

    if(req.body.device_token !== undefined) {
      updateData.device_token = req.body.device_token;
    }

    if(req.body.service_provider !== undefined) {
      updateData.service_provider = req.body.service_provider;
    }

    result.updateAttributes(updateData).then(function(result) {

      res.status(200);
      res.json(result);
    });
  });
});

//deletes a user
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