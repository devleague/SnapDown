'use strict';

var express = require('express');
var app = express();
var db = require('../models');
var routes = require('../routes');
// var challenge_routes = require('../routes/challenge_routes');
// var challenge_image_routes = require('../routes/challenge_image_routes');
// var challenge_user_routes = require('../routes/challenge_user_routes');
// var image_routes = require('../routes/image_routes');
// var user_routes = require('../routes/user_routes');
// var user_friend_routes = require('../routes/user_friend_routes');
var fbauth_routes = require('../routes/fbauth_routes');
var bodyParser = require('body-parser');
// var session = require('express-session');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var crypto = require('crypto');

// var User = db.User;

// app.use(session(
//   {
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
//   }
// ));

// app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id).then(
//     function(user) {
//       done(null, {username : user.username, id : user.id});
//     });
// });
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//       User.findOne({
//         where: { username: username }
//       }).then(function(user) {

//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (user.password !==  makeHash(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     }).catch(function (err) {
//         return done(err, null);
//         throw err;
//       });
//   }
// ));
//
app.use('/api', routes);
// app.use('/api/challenges', challenge_routes);
// app.use('/api/challenge_images', challenge_image_routes);
// app.use('/api/challenge_users', challenge_user_routes);
// app.use('/api/images', image_routes);
// app.use('/api/users', user_routes);
// app.use('/api/user_friends', user_friend_routes);
app.use('/api/register/facebook_register_user',fbauth_routes);

var server = app.listen(3000, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);

	db.sequelize.sync();
});