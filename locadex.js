const http = require('http');
const express = require('express');
const path = require('path');

//this is the address to connect to this node server on my computer on my home network, 
//it would have to be changed for any other situation
//get your ipv4 address with command ipconfig on windows command line 
const hostname = '192.168.1.110';
const port = 3000;

const locadex = express();

locadex.use(express.static('public'));


//locadex.use('/resources', express.static(path.join(__dirname, '/resources')));

locadex.use('/test', express.static(path.join(__dirname, '/test')));

locadex.get('/', function(req, res) {

res.end('Hello World\n')

});

locadex.listen(port, '0.0.0.0', function(){
  console.log(`Server running at http://${hostname}:${port}/`);
})