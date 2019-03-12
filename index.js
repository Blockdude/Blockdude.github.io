const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const app = express();

app.get('*', (req, res, next) => {
    console.log(`req.url: ${req.url}`);
    //let file = req.params.file;
    let file = req.url;

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

    res.sendFile(`images/Block.png`,{root: __dirname});

    /*if(fs.existsSync(file)){
        console.log(`Responding with ${file}`);
        res.sendFile(`${file}`,{root: __dirname});
    }else if(fs.existsSync(`${file}.html`)){
        console.log(`Responding with ${file}.html`);
        res.sendFile(`${file}.html`,{root: __dirname});
    }else if(req.url == "/" || req.url == ""){
        console.log(`Responding with index.html`);
        res.sendFile(`index.html`,{root: __dirname});
    }else{
        //res.writeHead(404, "File Not Found On Server!");
        console.log(`Responding with 404.html`);
        res.sendFile(`404.html`,{root: __dirname});
    }//*/
});



app.listen(port, () => {
    console.log(`Redirecting app listening on port ${port}!`);
});