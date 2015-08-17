'use strict';

var express = require('express');
var app = express();
var db = require('../models');
var fbauth_routes = require('../routes/fbauth_routes');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT")
  next();
});

var routes = require('../routes');

app.use('/api', routes);

app.use('/api/register/facebook_register_user',fbauth_routes);

var server = app.listen(3000, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);

	db.sequelize.sync();
});