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
  //need to json parse the req body
  console.log('hitting post messages',req.body)

  var challengeContext = JSON.parse(req.body);
  console.log('challenge context: ',challengeContext)
  var messageLog = {
    challengeId : req.body.id,
    messages: []
  };

  req.body.Challengers.forEach(function(challenger){
    var messageData = {
      from: messageService.from,
      to: challenger.User.phone + messageService[challenger.User.carrier],
      subject: messageService.subject,
      text: challenger.User.first_name + messageService.messageBody
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

