$(document).ready(function(){
    const apiKey = "bea41111d61f4a95c9cbdb0fdeada5f2";
    $("#submitButton").on("click", getInfo);

    var buildSearchHistory = function() {
        // get search history from local storage
        var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
        if (searchHistory == null) {
            // if the search history local variable does not exist then generate the left column with common locations
            searchHistory = ["Orlando","Atlanta","Dallas","Denver","New York","Detroit","Seattle", "Alburqueque"];
            localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
        }
        var groupContainer = $(".list-group");
        groupContainer.html("");
        for (i in searchHistory) {
            // generate a list group item for each city in search history
            var buttonEl = $("<button>")
                .addClass("list-group-item list-group-item-action")
                .attr("id", "citySearchList")
                .attr("type", "button")
                .text(searchHistory[i]);
            groupContainer.append(buttonEl);
        }
    };

    buildSearchHistory();

    var updateSearchHistory = function(city) {
        var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
        searchHistory.unshift(city);
        searchHistory.pop();
        localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
    
        // gather all list items
        var listItems = $(".list-group-item");
    
        // Update button text
        for (l in listItems) {
            // update text of each item
            listItems[l].textContent = searchHistory[l];
        };
    }

    updateSearchHistory();

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

var updateUVIndex = function(val) {
    // get current UV value and style element accordingly
    var uvEl = $("#currentUV");
    uvEl.text(val);
    uvEl.removeClass();

    if (val < 3) {
        uvEl.addClass("bg-success text-light p-2 rounded");
    } else if (val < 6) {
        uvEl.addClass("bg-warning text-light p-2 rounded");
    } else {
        uvEl.addClass("bg-danger text-light p-2 rounded");
    };
};

function getCurrentWeather(searchName){
console.log("City name coming from getInfo()", searchName)
let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchName}&units=metric&appid=${apiKey}`;
console.log("currentWeatherUrl", currentWeatherUrl)
fetch(currentWeatherUrl)
.then((response) => response.json())
.then((data) =>{
    console.log("DATA FROM API", data)

        let cityContainerEl = $("#currentCity");
        cityContainerEl.text(searchName);
        let dateEl = $("#currentDate");
        let tempEl = $("#currentTemp");
        let humidityEl = $("#currentHumidity");
        let windSpeedEl = $("#currentWindSpeed");
        let iconEl = $("#currentIcon");
    
        let currentTemp = data.main.temp;
        let currentHumidity = data.main.humidity;
        let currentWindSpeed = data.wind.speed;
        var currentTimeCodeUnix = data.dt;
        let currentDate = new Date(currentTimeCodeUnix*1000).toLocaleDateString("en-US");
        let currentIcon = data.weather[0].icon;
        
        dateEl.text(currentDate);
        tempEl.text(currentTemp);
        humidityEl.text(currentHumidity);
        windSpeedEl.text(currentWindSpeed);
        iconEl.attr("src", "https://openweathermap.org/img/w/" + currentIcon + ".png");
       
        var currentTimeCodeUnix = data.dt;
        let s = new Date(currentTimeCodeUnix*1000).toLocaleDateString("en-US")

    // getting coordinates of current City
    let coords = {
        lat: data.coord.lat,
        lon: data.coord.lon
    } 

    let apiUV = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}4&lon=${coords.lon}&exclude=minutely,hourly,alert,current&appid=${apiKey}`

    fetch(apiUV)
    .then(function(response){
        response.json().then(function(response){
            console.log(response);
            updateUVIndex(response.daily[0].uvi)
        });
    });
    
    // calling our getFiveDay forecast and passing coords because it uses coords to find the city
    getFiveDay(coords)
  })
}

function getFiveDay(coords){

    let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}4&lon=${coords.lon}&units=metric&exclude=minutely,hourly,alert,current&appid=${apiKey}`

    fetch(fiveDayUrl)
    .then((response) => response.json())
    .then((data) =>{
    console.log("FIVEDAY DATA", data)

    // in here create for loop for 5 and render data in specific parts of page
    let fiveDayDate = $(".date")
    let fiveDayIcon = $(".icon")
    let fiveDayTemp = $(".Temp")
    let fiveDayWind = $(".Wind")
    let fiveDayHumidity = $(".Humidity")
    
    for(var i = 0; i < fiveDayIcon.length+1; i++){
        
    console.log(fiveDayIcon[0])
    fiveDayDate.eq(i).text(new Date(data.daily[i+1].dt*1000).toLocaleDateString("en-US"))
    fiveDayIcon.eq(i).attr("src" , "https://openweathermap.org/img/w/" + data.daily[i+1].weather[0].icon + ".png");
    fiveDayTemp.eq(i).text("Temp: " + data.daily[i+1].temp.day + "°F")
    fiveDayWind.eq(i).text("Wind Speed: " + data.daily[i+1].wind_speed + "MPH")
    fiveDayHumidity.eq(i).text("Humidity: " + data.daily[i+1].humidity + "%") 
    console.log("5 days to work with", data.daily[i+1])
        //creates a div with a class of card. since youre using bootstrap it will recognize the class and automatically make it a card
        //let card = $("<div>").addClass("card")
    }
   })
  }
var input = $("");
localStorage.setItem("server", input.val());
var storedValue = localStorage.getItem("server");
})