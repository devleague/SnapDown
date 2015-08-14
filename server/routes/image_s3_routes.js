'use strict';

// var AWS = require('aws-sdk');
// var uuid = require('node-uuid');
var express = require('express');
var router = express.Router();
var db = require('../models').Image;

var S3_BUCKET_NAME = "snapdown-development";
var S3_FOLDER = "images/";

router.post('/', function(req,res) {

  console.log(req);

  var keyName = S3_FOLDER + uuid.v4() + ".jpg";

  // var body = fs.createReadStream(req.body);
  var s3 = new AWS.S3({params: {Bucket: S3_BUCKET_NAME, Key: keyName}});

  s3.upload({Body: req.body})
    .on('httpUploadProgress', function(evt) { console.log(evt); }).
    send(function(err, data) { console.log(err, data) });
  //TODO create image record on database
  res.status(200).send("done");
});

module.exports = router;