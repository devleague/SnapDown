var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hostname = process.env.HOSTNAME || 'localhost',
port = parseInt(process.env.PORT, 10) || 3000,
publicDir = process.argv[2] || __dirname + '/www';
var sequelize = require('sequelize');


// var db = require('./models');
// db.sequelize.sync();
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


app.get('/facebook-oauth-login',function(req,res){
	console.log(req.body);
	res.send('hello');
})


console.log('Success!  Server showing %s listening at http://%s:%s', publicDir, hostname, port);
app.listen(port, hostname);
