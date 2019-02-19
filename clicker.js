const playspace = document.getElementById("playspace");
const clickerTarget = document.createElement("BUTTON");
playspace.appendChild(clickerTarget);
clickerTarget.appendChild(document.createTextNode("Click!"));
clickerTarget.style.position = 'absolute';
clickerTarget.setAttribute("class","clickerButton");
clickerTarget.style.zIndex = 511;

let fakeClicked = false;
let clicks = -1;

function processClick(){
    // if(fakeClicked){
    //     window.location.href = "youLose.html";
    //     console.log("You lost!");
    //     console.log(clicks+" successful clicks!");
    // }
    clicks+=1;
    if(clicks%25==24){
        let fakeOut = document.createElement("BUTTON");
        fakeOut.appendChild(document.createTextNode("Don't Click!"));
        playspace.appendChild(fakeOut);
        fakeOut.style.position = 'absolute';
        fakeOut.setAttribute("onclick","clickFake()");
        fakeOut.setAttribute("class","clickerButton");
        fakeOut.style.zIndex = 0;
    }
    const clickerButtons = playspace.getElementsByClassName("clickerButton");
    for(let i=0;i<clickerButtons.length;i++){
        let button = clickerButtons[i];
        button.style.top = '200px';
        button.style.left = Math.random()*90+"vw";
    }
    console.log(clicks);
}

function clickReal(){
    processClick();
}

function clickFake(){
    fakeClicked=true;
    processClick();
}

clickerTarget.setAttribute("onclick","clickReal()");