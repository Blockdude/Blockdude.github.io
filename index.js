const express = require('express')();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const app = express();

let drawnScreen = []; //Array of our drawn divs

app.get('/connection.drawingPad', (req,res,next) => {
    console.log(`A new user connected to the drawingPad room.`);
    res.send("ACK");
});
app.get('/disconnect.drawingPad', (req,res,next) => {
    console.log(`A user disconencted from the drawingPad room.`);
    res.send("ACK");
});
app.get('/drawingPad.drawBar', (req,res,next) => {
    console.log(`A user drew a bar`);
    drawnScreen = drawnScreen + [[req.query.clickedX,req.query.clickedY,req.query.lastClickX,req.query.lastClickY,req.query.hexColor,req.query.drawSize]];
});
app.get('/drawingPad.drawDot', (req,res,next) => {
    console.log(`A user drew a dot`);
    drawnScreen = drawnScreen + [[req.query.clickedX,req.query.clickedY,req.query.hexColor,req.query.drawSize]];
});
app.get('/drawingPad.getItems', (req,res,next) => {
    console.log(`A user got drawn items`);
    res.send(drawnScreen);
});

app.get('*', (req, res, next) => {
    console.log(`req.url: ${req.url}`);
    //let file = req.params.file;
    let file = req.url;

    if(fs.existsSync(`.${file}`)){

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