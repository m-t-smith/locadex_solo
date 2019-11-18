//const http = require('http');
const https = require('https');
const express = require('express');
//const path = require('path');
const fs = require('fs');

//this is the address to connect to this node server on my computer on my home network, 
//it would have to be changed for any other situation
//get your ipv4 address with command ipconfig on windows command line 
//const hostname = '192.168.1.113';
//const port = 8000;

const options = {
  key: fs.readFileSync('sslKeyCert/server.key'),
  cert: fs.readFileSync('sslKeyCert/server.cert')
};

const locadex = express();

locadex.use(express.static('public'));


//locadex.use('/resources', express.static(path.join(__dirname, '/resources')));

//locadex.use('/test', express.static(path.join(__dirname, '/test')));

// locadex.get('/', function(req, res) {

// res.end('Hello World\n')

// });

//secure server creation

//locadex.listen(8000)

https.createServer(options, locadex).listen(8000, "192.168.1.113");
console.log("server running");
 // ).listen(port, function(){
  // console.log(`Server running at https://${hostname}:${port}/`);
// })

// locadex.listen(port, '0.0.0.0', function(){
  // console.log(`Server running at http://${hostname}:${port}/`);
// })