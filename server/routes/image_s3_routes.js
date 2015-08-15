'use strict';

var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var express = require('express');
var router = express.Router();
var db = require('../models').Image;

var S3_BUCKET_NAME = "snapdown-development";
var S3_FOLDER = "images/";

router.post('/', function(req,res) {

  console.log("UPLOAD POST RECEIVED");

  if(!req.body.base64Image) {

    res.status(400).send("No image attached to image upload request");
  }

  if(!req.body.challenger_id) {

    res.status(400).send("No challenger_id attached to image upload request");
  }

  var s3 = new AWS.S3( { params: {Bucket: S3_BUCKET_NAME} } );
  var keyName = S3_FOLDER + uuid.v4() + ".jpg";

  var buffer = new Buffer(req.body.base64Image.replace(/^data:image\/\w+;base64,/, ""),'base64');

  var data = {

    Key: keyName,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };

  s3.upload(data)
    .on('httpUploadProgress', function(event) { console.log(event); })
    .send(function(error, data) {

      if(error) {

        console.log(error);

        res.status(500).send('Could not upload image');
      }

      db.create({

        s3_reference: data.Location,
        privacy_status: req.body.privacy_status,
        challenger_id: req.body.challenger_id

      }).then(function(result) { //may be unnecessary

        res.status(200).send(data.Location);
      });
    });
});

module.exports = router;