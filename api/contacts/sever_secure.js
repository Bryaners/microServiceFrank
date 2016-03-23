var express = require('express');
var fs = require('fs');
var app = express();

var https = require('https');
var httpsPort = 34443;

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

app.get('/', function(req,res){res.send('Youre in')}	);

app.listen(process.env.PORT || 8081);