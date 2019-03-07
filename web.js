var express = require('express');
const https = require('https');
const os = require('os');
var app = express();

app.get('/', function(req, res) {

	https.get('https://localhost:3000/weather.html',(resp)=>{
		let data = "";
		resp.on('data',(chunk)=>{
			data+=chunk;
		});
		resp.on('end',() => {
			//data use here
		});
	});
    //fetch('localhost:3000/weather.html').then(data => res.send(data))
    //.catch(error => {res.send('');})
    //res.send('<h1>Hello World!</h1>');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');

console.log(os.hostname());
});