// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var config = require('../../config/');
var express = require('express');
var bodyParser = require('body-parser');
var pubnub = require("../../config/pubnub.js");
//create routing object
var appointment = require('./index');


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

// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(config.port)

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8081/");