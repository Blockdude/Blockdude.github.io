console.log("Hello, I'm clippy, the drawing pad assistant.");
const drawingSurface = document.getElementById("drawingSurface");

let pressedKeys = [];
let mouseKeys = [];
let lastClickX = 0;
let lastClickY = 0;
let drawSize = 50; //Size of the drawing tool in px
let colorRed = 25;
let colorGreen = 25;
let colorBlue = 25;

function keyDepressed(e){
	if(e.type == "mousedown"){
		if(!mouseKeys.includes(e.button)){
			//console.log(e.button + " clicked down.");
			mouseKeys.push(e.button);
			//console.log(mouseKeys);
		}
	}else{
		if(!pressedKeys.includes(e.key)){
			//console.log(e.key + " pressed down.");
			pressedKeys.push(e.key);
			handleKeyDown(e.key);
			console.log(pressedKeys);
		}
	}
}
function keyUnpressed(e){
	if(e.type == "mouseup"){
		//console.log(e.button + " released.");
		mouseKeys = mouseKeys.filter((val,i) => {return !(mouseKeys.indexOf(e.button) == i)});
		//console.log(mouseKeys);
	}else{
		//console.log(e.key + " released.");
		pressedKeys = pressedKeys.filter((val,i) => {return !(pressedKeys.indexOf(e.key) == i)});// = pressedKeys.splice(pressedKeys.indexOf(e.key),0);
		//handleKeyUp(e.key);
		console.log(pressedKeys);
	}
}
function scroll(e){
	//console.log(e.deltaY);
	let modifiers = getModifiers();
	const toolIndicator = document.getElementById("toolSize");
	
	if(pressedKeys.includes('`')){//Mod and scrollwheel, change tool size
		drawSize += e.deltaY>0 ? -1 : 1;
		//console.log("Tool Size: "+drawSize+"px");
		toolIndicator.getElementsByTagName("p")[0].innerHTML = drawSize+"px";
		toolIndicator.style.color = "#fff";
		flashIndicator();
	}
	if(pressedKeys.includes('1')){
		//console.log("Red: "+colorRed);
		colorRed += e.deltaY>0 && colorRed>0 ? -5 : e.deltaY<0 && colorRed<255 ? 5 : 0;
		toolIndicator.getElementsByTagName("p")[0].innerHTML = colorRed;
		toolIndicator.style.color = "#"+rgbHex(colorRed)+rgbHex(colorGreen)+rgbHex(colorBlue);
		flashIndicator();
	}
	if(pressedKeys.includes('2')){
		//console.log("Green: "+colorGreen);
		colorGreen += e.deltaY>0 && colorGreen>0 ? -5 : e.deltaY<0 && colorGreen<255 ? 5 : 0;
		toolIndicator.getElementsByTagName("p")[0].innerHTML = colorGreen;
		toolIndicator.style.color = "#"+rgbHex(colorRed)+rgbHex(colorGreen)+rgbHex(colorBlue);
		flashIndicator();
	}
	if(pressedKeys.includes('3')){
		//console.log("Blue: "+colorBlue);
		colorBlue += e.deltaY>0 && colorBlue>0 ? -5 : e.deltaY<0 && colorBlue<255 ? 5 : 0;
		toolIndicator.getElementsByTagName("p")[0].innerHTML = colorBlue;
		toolIndicator.style.color = "#"+rgbHex(colorRed)+rgbHex(colorGreen)+rgbHex(colorBlue);
		flashIndicator();
	}
}
function handleKeyDown(key){
	console.log("Handling Key");
	if(pressedKeys.includes('Control') && pressedKeys.includes('z')){
		console.log("Control-Z");
		drawingSurface.removeChild(drawingSurface.lastChild);
	}
}

function mouseDownSurface(e){
	//console.log(e);
	if(mouseKeys.includes(0)){ //LMB is depressed
		let clickedX = e.pageX-drawingSurface.getBoundingClientRect().left;
		let clickedY = e.pageY-drawingSurface.getBoundingClientRect().top;
		
		let modifiers = getModifiers();
		
		/*if(e.target.className != "drawingSurface"){
			clickedX += e.layerX-e.target.getBoundingClientRect().left;
			clickedY += e.layerY-e.target.getBoundingClientRect().top;
		}//*///used when not using the current clickedX/Y math
		
		
		//console.log(modifiers);
		if((modifiers | 0000) == 0000 && (modifiers & 0000) == 0000){ //Just a click/click+drag
			drawDot(clickedX,clickedY,"#"+rgbHex(colorRed)+rgbHex(colorGreen)+rgbHex(colorBlue),drawSize);
			//console.log((modifiers | 0000)+" -> single click");
		}
		if((modifiers | 0001) == 0001 && (modifiers & 0001) == 0001){ //Draw line from last to new.
			drawDot(clickedX,clickedY,"#"+rgbHex(colorRed)+rgbHex(colorGreen)+rgbHex(colorBlue),drawSize);
			drawBar(clickedX,clickedY,lastClickX,lastClickY,"#"+rgbHex(colorRed)+rgbHex(colorGreen)+rgbHex(colorBlue),drawSize);
			drawDot(lastClickX,lastClickY,"#"+rgbHex(colorRed)+rgbHex(colorGreen)+rgbHex(colorBlue),drawSize);
			//console.log((modifiers | 0001)+" -> drag click");
		}
		
		
		
		lastClickX = clickedX;
		lastClickY = clickedY;
	}
}

function drawPixel(x,y,color){
	const newPixel = document.createElement("div");
	drawingSurface.appendChild(newPixel);
	newPixel.style.backgroundColor = "#060";
	newPixel.classList.add("pixel");
	newPixel.style.left = x+"px";
	newPixel.style.top = y+"px";
}
function drawDot(x,y,color,size){
	const newDot = document.createElement("div");
	drawingSurface.appendChild(newDot);
	newDot.style.backgroundColor = color;
	newDot.style.borderRadius = "50%";
	newDot.style.width = size+"px";
	newDot.style.height = size+"px";
	newDot.classList.add("dot");
	newDot.style.left = (x-size/2)+"px";
	newDot.style.top = (y-size/2)+"px";
}
function drawBar(x1,y1,x2,y2,color,size){
	const newBar = document.createElement("div");
	let xStep = x2-x1;
	let yStep = y2-y1;
	let angle = Math.atan2(yStep,xStep);// * 180 / Math.PI;
	let dist = Math.pow(Math.pow(xStep,2)+Math.pow(yStep,2),0.5);
	
	drawingSurface.appendChild(newBar);
	newBar.style.backgroundColor = color;
	newBar.style.transform = "rotate("+angle+"rad)";
	newBar.style.width = dist+"px";
	newBar.style.height = size+"px";
	newBar.classList.add("rectangle");
	newBar.style.left = Math.min(x1,x2)+(Math.abs(xStep)/2)-(dist/2)+"px";
	newBar.style.top = Math.min(y1,y2)+(Math.abs(yStep)/2)-(size/2)+"px";
}
function flashIndicator(){
	const toolIndicator = document.getElementById("toolSize");
	toolIndicator.style.opacity = (toolIndicator.style.opacity)-(-1);
	toolIndicator.style.visibility = "visible";
	setTimeout(function(){toolIndicator.style.opacity = (toolIndicator.style.opacity)-1;toolIndicator.style.visibility = "hidden";},1000);
}

alert("Hold ~ and scroll to change tool size.\nHold 1,2, or 3 and scroll to change color.\nEnjoy!");
drawingSurface.setAttribute("onmousedown","keyDepressed(event); mouseDownSurface(event)");
drawingSurface.setAttribute("onmousemove","mouseDownSurface(event)");
drawingSurface.addEventListener('wheel',e => scroll(e));
drawingSurface.setAttribute("onmouseup","keyUnpressed(event)");
window.addEventListener('keydown',e => keyDepressed(e));
window.addEventListener('keyup',e => keyUnpressed(e));

function getModifiers(){
	let modifiers = 0; //1 = shift, 2 = ctrl, 4 = alt, 8 = `
	if(pressedKeys.includes("Shift")){modifiers+=1;}
	if(pressedKeys.includes("Control")){modifiers+=2;}
	if(pressedKeys.includes("Alt")){modifiers+=4;}
	if(pressedKeys.includes("`")){modifiers+=8;}
	return modifiers;
}
function rgbHex(rgb){ 
  let hex = Number(rgb).toString(16);
  return hex.length < 2 ? "0"+hex : hex;
}