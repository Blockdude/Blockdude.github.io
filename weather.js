const latBox = document.getElementById("latBox");
const longBox = document.getElementById("longBox");
const output = document.getElementById("output"); //Output Div

function getWeatherByLL(){
    const lat = latBox.value;
    const long = longBox.value;
    fetch('https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+long)
    .then(response => {
        response.json().then(data => {
            console.log(data);
            const wx = data.weather;
			let wxs = [];
            if(wx.length == 0){
                document.getElementById("overview").innerHTML = "Clear";
            }else if(wx.length == 1){
                document.getElementById("overview").innerHTML = wx[0].description;
				wxs.push(wx[0].description);
            }else if(wx.length == 2){
                document.getElementById("overview").innerHTML = wx[0].description + " and " + wx[1].description;
				wxs.push(wx[0].description,wx[1].description);
            }else{
                let overviewString = "";
                for(let i = 0; i<wx.length; i++){
                    if(i == 0){
                        overviewString = wx[i].main;
                    }else if(i+1-wx.length == 0){
                        overviewString += ", and " + wx[i].main + ".";
                    }else{
                        overviewString += ", " + wx[i].main;
                    }
					wxs.push(wx[i].description);
                }
                document.getElementById("overview").innerHTML = overviewString;
            }
            document.getElementById("location").innerHTML = data.name;
            document.getElementById("temp").innerHTML = data.main.temp;
            document.getElementById("tempMin").innerHTML = data.main.temp_min;
            document.getElementById("tempMax").innerHTML = data.main.temp_max;
            document.getElementById("pressure").innerHTML = data.main.pressure;
            document.getElementById("humidity").innerHTML = data.main.humidity;
            document.getElementById("wind").innerHTML = data.wind.speed;
            let gusts = "";
            if(data.wind.gust+"" != "undefined"){
                gusts = "mph with gusts to "  +data.wind.gust;
            }
            document.getElementById("gust").innerHTML = gusts;
			
			Array.prototype.slice.call(document.getElementsByClassName("raindrop")).forEach(element => {
				element.style.visibility = "hidden";
			});
			Array.prototype.slice.call(document.getElementsByClassName("snowflake")).forEach(element => {
				element.style.visibility = "hidden";
			});
			for (index in wxs){
				const part = wx[index].description;
				
				if(part.includes("rain")){
					console.log("Raining");
					Array.prototype.slice.call(document.getElementsByClassName("raindrop")).forEach(element => {
						element.style.visibility = "visible";
					});
					anime({
						targets: '.raindrop',
						translateX: function(el, i, l) {
							const width = document.getElementById("visualDiv").clientWidth;
							const rand = Math.random()*(width-10)+5;
							return [rand,rand-Math.random()*5];
						},
						translateY: function(el, i, l) {
							const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
							return [Math.random()*100-175,Math.random()*100+25];
						},
						/*translateX: function(el, i, l) {
							const width = document.getElementById("visualDiv").clientWidth;
							const rand = Math.random()*width-5;
							return [rand,rand-Math.random()*30];
						},
						translateY: function(el, i, l) {
							const height = document.getElementById("visualDiv").clientHeight;
							const rand = Math.random()*height;
							return [0,rand];
						},//*/
						loop: true,
						duration: 150,
						delay: function(el, i, l) {
							return Math.random()*100;
						},
						easing: 'linear'
					});
				}
				
				if(part.includes("snow")){
					console.log("Snowing");
					Array.prototype.slice.call(document.getElementsByClassName("snowflake")).forEach(element => {
						element.style.visibility = "visible";
					});
					anime({
						targets: '.snowflake',
						translateX: function(el, i, l) {
							const width = document.getElementById("visualDiv").clientWidth;
							const rand = Math.random()*(width-10)+5;
							return [rand,rand-Math.random()*5];
						},
						translateY: function(el, i, l) {
							const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
							return [Math.random()*100-175,Math.random()*100+25];
						},
						loop: true,
						duration: 350,
						delay: function(el, i, l) {
							return Math.random()*100;
						},
						easing: 'linear'
					});
				}
			}
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

if(latBox.value == "" || longBox.value == ""){
	if ("geolocation" in navigator) {
	  console.log("Using browser GeoLocation to enter default Lat/Long");
	  navigator.geolocation.getCurrentPosition(position => {
		  console.log(position);
		  latBox.value = position.coords.latitude;
		  longBox.value = position.coords.longitude;
		  getWeatherByLL();
	  });
	}else{
		console.log("No GeoLocation in browser.");
	}
}else{
	getWeatherByLL();
}

submit.setAttribute("onclick","getWeatherByLL()")