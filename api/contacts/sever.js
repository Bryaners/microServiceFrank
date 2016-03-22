

var http = require('http')
var auth = require('basic-auth')
 
// Create server 
var server = http.createServer(function (req, res) {
  var credentials = auth(req)
 
  if (!credentials || credentials.name !== 'fant' || credentials.pass !== 'fant') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied no beamish')
  } else {
    res.end('Access granted beamnish')
    // Put a friendly message on the terminal
	console.log("User accepted");
  }
})
 
// Listen 
server.listen(3000)