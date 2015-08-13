'use strict';

var express = require('express');
var router = express.Router();
var challengeDb = require('../models').Challenge;
var challengerDb = require('../models').Challenger;
var userDb = require('../models').User;

var api_key = 'key-a69495336dc135f2789876d8c09e9d4e';
var domain = 'sandboxb9b6462eb23d4e9da7ce8569e9354d0f.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var messageService = require('../services/message_service.js')


router.post('/',function(req,res){
  console.log('hitting post messages',req.body)

  var messageLog = {
    challengeId : req.id,
    messages: []
  };

  req.Challengers.forEach(function(user){
    var messageData = {
      from: messageService.from,
      to: user.phone + messageService[user.carrier],
      subject: messageService.subject,
      text: user.username + messageService.messageBody
    }

    mailgun.messages().send(messageData, function (error, body) {
      if(error){
        console.log(error);
      }
      body.userId = user.id;
      console.log(body);
      messageLog.messages.push(body);
      //write this messageLog to a file
    });
  }).then(function(result){
    console.log(result);
  })
});

module.exports = router;


  var testObj = {
    "id": 1,
    "start_at": null,
    "expire_at": null,
    "name": "test 1",
    "privacy_status": "public",
    "created_at": "2015-08-12T21:05:38.228Z",
    "updated_at": "2015-08-12T21:05:38.228Z",
    "Challengers": [
      {
        "id": 1,
        "initiator_flag": true,
        "created_at": "2015-08-12T21:05:55.860Z",
        "updated_at": "2015-08-12T21:05:55.860Z",
        "challenge_id": 1,
        "user_id": 1,
        "Image": null,
        "User": {
          "id": 1,
          "first_name": "Henry",
          "last_name": "Lucas",
          "facebook_id": "",
          "facebook_image_url": "",
          "email": "foo@gmail.com",
          "phone": "555-555-5555",
          "created_at": "2015-08-12T21:05:21.354Z",
          "updated_at": "2015-08-12T21:05:21.354Z"
        }
      }
    ]
  }

