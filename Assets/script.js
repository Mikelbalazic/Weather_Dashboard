$(document).ready(function(){
    const apiKey = "bea41111d61f4a95c9cbdb0fdeada5f2";
    $("#submitButton").on("click", getInfo);

function getInfo(){
    const searchName = $("#citySearch").val()
    if(searchName == ""){
        alert("Please enter valid city name")
        return;
    }
    else{
        getCurrentWeather(searchName)
    }
    $("#currentIcon"). removeClass()
}

function getCurrentWeather(searchName){
console.log("City name coming from getInfo()", searchName)
let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchName}&units=metric&appid=${apiKey}`;
console.log("currentWeatherUrl", currentWeatherUrl)
fetch(currentWeatherUrl)
.then((response) => response.json())
.then((data) =>{
    console.log("DATA FROM API", data)

    var cityContainerEl = $("#currentCity");
                cityContainerEl.text(searchName);

        var dateEl = $("#currentDate");
        var tempEl = $("#currentTemp");
        var humidityEl = $("#currentHumidity");
        var windSpeedEl = $("#currentWindSpeed");
        var iconEl = $("#currentIcon");
     
    
        var currentTemp = data.main.temp;
        var currentHumidity = data.main.humidity;
        var currentWindSpeed = data.wind.speed;
        var currentTimeCodeUnix = data.dt;
        var currentDate = new Date(currentTimeCodeUnix*1000).toLocaleDateString("en-US");
        var currentIcon = data.weather[0].icon;
        
        dateEl.text(currentDate);
        tempEl.text(currentTemp);
        humidityEl.text(currentHumidity);
        windSpeedEl.text(currentWindSpeed);
        iconEl.attr("src", "https://openweathermap.org/img/w/" + currentIcon + ".png");
       
        var currentTimeCodeUnix = data.dt;
        var s = new Date(currentTimeCodeUnix*1000).toLocaleDateString("en-US")

        var updateUVIndex = function(val) {
            // get current UV value and style element accordingly
            var uvEl = $("#currentUV");
            uvEl.text(val);
        
            if (val < 3) {
                uvEl.addClass("bg-success text-light p-2 rounded");
            } else if (val < 6) {
                uvEl.addClass("bg-warning text-light p-2 rounded");
            } else {
                uvEl.addClass("bg-danger text-light p-2 rounded");
            };
        };
    
    // getting coordinates of current City
    let coords = {
        lat: data.coord.lat,
        lon: data.coord.lon
    }
    // calling our getFiveDay forecast and passing coords because it uses coords to find the city
    getFiveDay(coords)
})
}

function getFiveDay(coords){

    let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}4&lon=${coords.lon}&exclude=minutely,hourly,alert,current&appid=${apiKey}`

    fetch(fiveDayUrl)
    .then((response) => response.json())
    .then((data) =>{
    console.log("FIVEDAY DATA", data)

    // in here create for loop for 5 and render data in specific parts of page

    for(var i =1; i < 6; i++){

        

        console.log("5 days to work with", data.daily[i])

        //creates a div with a class of card. since youre using bootstrap it will recognize the class and automatically make it a card
        let card = $("<div>").addClass("card")
    }
   })
  }
})