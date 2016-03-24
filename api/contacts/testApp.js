// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var config = require('../../config/');
var express = require('express');
var bodyParser = require('body-parser');
var pubnub = require("../../config/pubnub.js");
//create routing object
var appointment = require('./index');
var express = require('express');
var fs = require('fs');
//var app = express();

var https = require('https');
var httpsPort = 34443;

//create an express app
var app = express();

//tryinfg to connect a web page
app.use(express.static(__dirname + '/../../public'));
// Configure the app to serve up content from public directory
//app.use(express.static(__dirname + '/public'));

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());

//add static path.
app.use(express.static(config.root));
console.log(config.root);

//Add routes for contacts api
app.get('/api/contacts',appointment.index);
app.post('/api/contacts',appointment.create);
app.put('/api/contacts/:id',appointment.update);
app.delete('/api/contacts/:id',appointment.delete);

//Setup https
var options = {

	key: fs.readFileSync('./private.key'),
	cert: fs.readFileSync('.certificate.pem')
};

var secureSever = https.creteSever(options, app).listen(httpsPort);

app.all('/*', function(req, res, next){
	if(req.secure){
		console.log('secure');
			return next();

	};
			res.redirect('https://'+res.hostname+':'+app.get('port_https')+req.url);
});

// Listen on port 8000, IP defaults to 127.0.0.1
app.get('/', function(req,res){res.send('Youre in')}	);

app.listen(process.env.PORT || 8081);
//app.listen(config.port)

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8081/");