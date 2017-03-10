var express = require('express')
var app = express();

app.listen(8080);
console.log('server is running');

app.use(express.static("../build"));



