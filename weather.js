/*const stateInput = document.getElementById("stateInput");
const localInput = document.getElementById("localInput");
localInput.style.visibility = "hidden";

function getStations(stateID){
    fetch('https://api.weather.gov/stations?state='+stateID)
    .then(response => {
        response.json().then(data => {
            console.log(data);
            const returns = data.features;
            console.log(returns.length+" results.");
            while (localInput.hasChildNodes()){
                localInput.removeChild(localInput.firstChild); //Take their firstborn
            }
            localInput.style.visibility = "visible";
            for(let i=0;i<returns.length;i++){
                const newOption = document.createElement("option");
                newOption.appendChild(document.createTextNode(returns[i].properties.name));
                newOption.setAttribute("value",returns[i].properties.stationIdentifier);
                localInput.appendChild(newOption);
            }
            console.log("List Generated");
        });
    })
    .catch(error => {
        console.error(error);
    });
}
function getWeather(stationID){
    fetch('https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=1&mostRecent=true&stationString='+stationID)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
}

stateInput.setAttribute("onchange","if(this.selectedIndex!=0){getStations(this.options[this.selectedIndex].value);}");
localInput.setAttribute("onchange","if(this.selectedIndex!=0){getWeather(this.options[this.selectedIndex].value);}");
if(localInput.selectedIndex && localInput.options[localInput.selectedIndex] && localInput.selectedIndex!=0){
    getWeather(localInput.options[localInput.selectedIndex].value);
}else if(stateInput.selectedIndex!=0){
    getStations(stateInput.options[stateInput.selectedIndex].value);
}//*/

// const zipBox = document.getElementById("zipBox");
// const countryInput = document.getElementById("countryInput");
// const submit = document.getElementById("submit");

// function getWeatherByZip(){
//     const zipData = zipBox.value;
//     const countryData = countryInput.options[countryInput.selectedIndex].value;
//     let info = zipData+","+countryData
//     console.log("Getting data from "+info);
//     //fetch('https://samples.openweathermap.org/data/2.5/weather?zip='+info, {mode: "cors"})
//     fetch('https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139')
//     .then(response => {
//         response.json().then(data => {
//             console.log(data);
//         });
//     })
//     .catch(error => console.error(error));
// }

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
            if(wx.length == 0){
                document.getElementById("overview").innerHTML = "Clear";
            }else if(wx.length == 1){
                document.getElementById("overview").innerHTML = wx[0].description;
            }else if(wx.length == 2){
                document.getElementById("overview").innerHTML = wx[0].description + " and " + wx[1].description;
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
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

submit.setAttribute("onclick","getWeatherByLL()")