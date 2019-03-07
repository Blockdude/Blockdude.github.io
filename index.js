const express = require('express');
const ejs = require('ejs');
const port = process.env.PORT || 5000;
const path = require('path');
const app = express();

app.set('view engine', 'ejs')
.get('/', (req, res) => res.render('/index.ejs'));

/*app.get('/', function(req, res) {
    console.log(`req = ${req}`);
    if(req == ""){
        res.send('<h1>index.here</h1>');
    }else{

    res.send('<h1>Heroku world!</h1>');
    }
});//*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});