const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const app = express();

let drawJSON = {
    divs: []
}; //JSON of our drawn divs and their data

app.get('/connection.drawingPad*', (req,res,next) => {
    console.log(`A new user connected to the drawingPad room.`);
    res.sendStatus(200);
    //res.send("ACK");
});
app.get('/disconnect.drawingPad*', (req,res,next) => {
    console.log(`A user disconencted from the drawingPad room.`);
    res.sendStatus(200);
    //res.send("ACK");
});
app.get('/drawingPad.drawBar*', (req,res,next) => {
    console.log(`A user drew a bar`);
    drawJSON.divs.push([req.query.clickedX,req.query.clickedY,req.query.lastClickX,req.query.lastClickY,req.query.hexColor,req.query.drawSize]);
    res.sendStatus(200);
    //res.send("ACK");
});
app.get('/drawingPad.drawDot*', (req,res,next) => {
    console.log(`A user drew a dot`);
    drawJSON.divs.push([req.query.clickedX,req.query.clickedY,req.query.hexColor,req.query.drawSize]);// = drawnScreen + [req.query.clickedX,req.query.clickedY,req.query.hexColor,req.query.drawSize];
    res.sendStatus(200);
    //res.send("ACK");
});
app.get('/drawingPad.getItems*', (req,res,next) => {
    console.log(`A user got drawn items`);
    let editedDrawJSON = drawJSON;
    let e = req.query.cut;
    editedDrawJSON.splice(0,e); //Remove the first e elements because user already has them.
    console.log(editedDrawJSON);
    res.send(JSON.stringify(editedDrawJSON));
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