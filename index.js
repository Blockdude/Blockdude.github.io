const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const app = express();
const io = require('socket.io')();

io.on('connection.drawingPad', socket => {
    console.log(`A new user connected to the drawingPad room.`);
    socket.on('disconnect', () => {
        console.log(`A user disconencted from the drawingPad room.`);
    });
    socket.on('drawingPad.drawBar', data => {
        io.emit('drawingPad.drawBar',data); //Tell all clients to draw given bar
    });
    socket.on('drawingPad.drawDot', data => {
        io.emit('drawingPad.drawDot',data); //Tell all clients to draw given bar
    });
});

io.on('', socket =>{

});

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

    if(fs.existsSync(file)){
        res.sendFile(`${req.url}`,{root: __dirname});
    }

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