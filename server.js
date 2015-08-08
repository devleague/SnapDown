var express = require('express');
var app = express();
var hostname = process.env.HOSTNAME || 'localhost',
port = parseInt(process.env.PORT, 10) || 3000,
publicDir = process.argv[2] || __dirname + '/www';
var sequelize = require('sequelize');


// var db = require('./models');
// db.sequelize.sync();
console.log(publicDir);
app.use(express.static(publicDir));

app.get('/login', function (req, res) {
  res.redirect('/templates/login.html');
});



app.post('/api/db/add-to-user',function(req,res){
  console.log(req.body.data.email);

});

console.log('Success!  Server showing %s listening at http://%s:%s', publicDir, hostname, port);
app.listen(port, hostname);
