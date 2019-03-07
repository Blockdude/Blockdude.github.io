const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

app.get('/', function(req, res) {

	res.send('<h1>Heroku world!</h1>');
});

app.listen(port, () => {
    console.log('Example app listening on port ${port}!');
});