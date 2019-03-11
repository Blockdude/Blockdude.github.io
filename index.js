const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const app = express();

app.get('*', (req, res, next) => {
    console.log(`req.url: ${req.url}`);
    let file = req.params.file;

    let mime = req.url.lastIndexOf('.') == -1 ? 'text/html' :
        {'.html':'text/html',
        '.ico':'image/x-icon',
        '.jpg':'image/jpeg',
        '.png':'image/png',
        '.gif':'image/gif',
        '.css':'text/css',
        '.js':'text/javascript'}
        [req.url.substr(req.url.lastIndexOf('.'))];
    //res.writeHeader('Content-type',mime);
    console.log(mime);

    if(fs.existsSync(file)){
        res.sendFile(`${file}`,{root: __dirname});
    }else if(fs.existsSync(`${file}.html`)){
        //res.writeHeader('Content-type','text/html');
        res.sendFile(`${file}.html`,{root: __dirname});
    }else if(req.url == "/" || req.url == ""){
        res.sendFile(`index.html`,{root: __dirname});
    }else{
        //res.writeHead(404, "File Not Found On Server!");
        res.sendFile(`404.html`,{root: __dirname});
    }
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});