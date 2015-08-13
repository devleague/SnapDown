'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var challengeDb = require('../models').Challenge;
var challengerDb = require('../models').Challenger;
var userDb = require('../models').User;

var api_key = 'key-a69495336dc135f2789876d8c09e9d4e';
var domain = 'sandboxb9b6462eb23d4e9da7ce8569e9354d0f.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var messageService = require('../services/message_service.js')


router.post('/',function(req,res){

  req.body.users.forEach(function(user){
    var messageBody = 'Hi '
      + user.first_name
      + '! '
      + req.body.challengerName
      + ' '
      + messageService.messageBody;

    var messageData = {
      from: messageService.from,
      to: user.phone + messageService[user.service_provider],
      subject: messageService.subject,
      text: messageBody
    }

    mailgun.messages().send(messageData, function (error, body) {
      if(error){
        console.log(error);
      }
    }).then(function(result){

      var stringResult = JSON.stringify(result) + '\n';
      fs.appendFile("./server/logs/message_logs.txt", stringResult, function(err) {
        if(err) {
          return console.log(err);
        }
      });
    });
  });
});

module.exports = router;
