'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var challengeDb = require('../models').Challenge;
var challengerDb = require('../models').Challenger;
var userDb = require('../models').User;

var api_key = 'key-a69495336dc135f2789876d8c09e9d4e';
var domain = 'snapdown.us';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var messageService = require('../services/message_service.js')


router.post('/',function(req,res) {

  var userIDs = [];

  req.body.users.forEach(function(user) {

    userIDs.push(user.id);
  });

  userDb.findAll({

    where: {

      id: {

        in: userIDs
      }
    }

  }).then(function(users) {

    users.forEach(function(user) {

      var messageBody = 'Hi '
        + user.first_name
        + '! '
        + req.body.challengerName
        + ' '
        + messageService.messageBody;

      var messageData = {
        from: messageService.from,
        to: user.phone + messageService[user.provider_id],
        subject: messageService.subject,
        text: messageBody
      };

      mailgun.messages().send(messageData, function (error, body) {

        if(error){

          console.log(error);
        }

      }).then(function(result){

        var stringResult = JSON.stringify(result) + '\n';

        fs.appendFile("./server/logs/message_logs.txt", stringResult, function(err) {

          if(error) {

            return console.log(error);
          }
        });
      });
    });
  });
});

  // req.body.users.forEach(function(user) {

  //   var messageBody = 'Hi '
  //     + user.first_name
  //     + '! '
  //     + req.body.challengerName
  //     + ' '
  //     + messageService.messageBody;

  //   var messageData = {
  //     from: messageService.from,
  //     to: user.phone + messageService[user.provider_id],
  //     subject: messageService.subject,
  //     text: messageBody
  //   }

  //   mailgun.messages().send(messageData, function (error, body) {

  //     if(error){

  //       console.log(error);
  //     }

  //   }).then(function(result){

  //     var stringResult = JSON.stringify(result) + '\n';

  //     fs.appendFile("./server/logs/message_logs.txt", stringResult, function(err) {

  //       if(error) {

  //         return console.log(error);
  //       }
  //     });
  //   });
  // });
// });

module.exports = router;

