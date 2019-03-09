const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const app = express();

app.get('/:file', (req, res, next) => {
    console.log(`req.params.file: ${req.params.file}`);
    if(fs.existsSync(req.params.file)){
        res.sendFile(`${req.params.file}`,{root: __dirname});
    }else if(fs.existsSync(`${req.params.file}.html`)){
        res.sendFile(`${req.params.file}.html`,{root: __dirname});
    }else{
        res.sendFile(`404.html`,{root: __dirname});
    }
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});