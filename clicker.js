const playspace = document.getElementById("playspace");
const clickerTarget = document.createElement("BUTTON");
const raveAudio = document.getElementById("raveAudio");
const scorePara = document.getElementById("score");
const specialElements = document.getElementsByClassName("easterEggText");
for(let i=0;i<specialElements.length;i++){
	specialElements[i].style.visibility = "hidden";
}
raveAudio.setAttribute("volume",0);
raveAudio.volume = 0;


$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload(); 
    }
}); // Reloads page and cleans up last game's click buttons


playspace.appendChild(clickerTarget);
clickerTarget.appendChild(document.createTextNode("Click!"));
clickerTarget.style.position = 'absolute';
clickerTarget.setAttribute("class","clickerButton");
clickerTarget.style.zIndex = 511;

let fakeClicked = false;
let unprocessedClicks = 0;
let clicks = 0;

function processClick(){
    if(fakeClicked){
        window.location.href = "youLose.html";
        console.log("You lost!");
        console.log(clicks+" successful clicks!");
    }
    clicks+=1;
    if(clicks%25==24){
        let fakeOut = document.createElement("BUTTON");
        fakeOut.appendChild(document.createTextNode("Don't!"));
        playspace.appendChild(fakeOut);
        fakeOut.style.position = 'absolute';
        fakeOut.setAttribute("onclick","clickFake()");
        fakeOut.setAttribute("class","clickerButton");
        fakeOut.style.zIndex = 0;
    }
    const clickerButtons = playspace.getElementsByClassName("clickerButton");
    for(let i=0;i<clickerButtons.length;i++){
        let button = clickerButtons[i];
        button.style.top = Math.random()*94+"vh";
        button.style.left = Math.random()*97+"%";
    }
	scorePara.innerHTML = clicks;
    console.log(clicks);
}

function clickReal(){
	raveAudio.play();
    processClick();
	unprocessedClicks+=1;
	setTimeout(function(){
		unprocessedClicks-=1;
		if(unprocessedClicks==0){
			raveAudio.pause();
			resetVolume();
			for(let i=0;i<specialElements.length;i++){
				specialElements[i].style.visibility = "hidden";
			}
		}else{
			if(clicks >= 256){
				if((new Date().getTime()%960)>480){
					scorePara.style.visibility = "hidden";
					for(let i=0;i<specialElements.length;i++){
						specialElements[i].style.visibility = "visible";
					}
				}else{
					scorePara.style.visibility = "visible";
					for(let i=0;i<specialElements.length;i++){
						specialElements[i].style.visibility = "hidden";
					}
				}
			}
		}
	}, 100);
	if(parseFloat(raveAudio.getAttribute("volume"))<1 && clicks >= 256){
		let vol = parseFloat(raveAudio.getAttribute("volume"))+0.005;
		raveAudio.setAttribute("volume",vol);
		raveAudio.volume = vol;
		//console.log("Vol = "+vol);
	}
}

function clickFake(){
    fakeClicked=true;
    processClick();
}

function resetVolume(){
	raveAudio.setAttribute("volume",0);
	//console.log("Vol Reset");
}

clickerTarget.setAttribute("onclick","clickReal()");