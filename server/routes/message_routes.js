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


var data = {
  from: messageService.from,
  to: '9725107985@txt.att.net',
  subject: messageService.subject,
  text: messageService.messageBody
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});



router.post('/:id', function(req,res) {

  userDb.findOne({
    where: {
      user_id: req.params.id
    }
  })


});