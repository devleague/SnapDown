'use strict';

// var AWS = require('aws-sdk');
// var uuid = require('node-uuid');
var express = require('express');
var router = express.Router();
var db = require('../models').Image;

router.post('/', function(req,res) {

  console.log(req.body);

  // db.create({

  //   // user_id: req.body.user_id,
  //   // image_id: req.body.image_id,
  //   // challenger_id: req.body.challenge_id,
  //   s3_reference: req.body.s3_reference,
  //   privacy_status: req.body.privacy_status,
  //   challenger_id: req.body.challenger_id

  // }).then(function(result) { //may be unnecessary

  //   res.status(200).json(result);
  // });
});