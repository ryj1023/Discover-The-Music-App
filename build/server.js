var express = require('express')
var app = express();
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

app.listen(8080);
console.log('server is running');

app.use(express.static("../build")).use(cookieParser());;

