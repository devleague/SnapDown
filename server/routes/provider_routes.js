'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Provider;

router.get('/', function(req,res) {
  db.findAll()
    .then(function(results) {
      res.json(results);
    });
});

module.exports = router;