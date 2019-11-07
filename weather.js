$(document).ready(function(){
var citySearch = "";

const today = new Date();
$("#date").text(today.toDateString());

//Click button to run all data
$(".button").on("click", function() {

//Assigning the input a value
citySearch = $("#city").val();

//Beginning of current weather API
var apiKey = "e5e9f301f1eabb94b3b35f734847ab2d";
var currentQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=${apiKey}`



$.ajax({
    url: currentQueryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    var name = response.name;
    var temperature = /*"Temp: " + */response.main.temp;/* + "° F";*/
    var humidity = "Humidity: " + response.main.humidity + "%";
    var windspeed = "Wind Speed: " + response.wind.speed + "MPH";
    var icon = response.weather[0].icon;
    var answer = null;
    if (temperature < 60) {
        answer = "It's sweata weatha!!!"
    }
    else {
        answer = "It's nakey bakey..."
    };
    var today = $(".today")
    var current = $("<div>").html(`<div class="card" style="width: 100%; margin-bottom: 20px;">
    <div class="card-body">
        <h3>${name}<img src="http://openweathermap.org/img/wn/${icon}@2x.png"></h3>
        <p class="card-text">Temp: ${temperature}° F</p>
        <p class="card-text">${humidity}</p>
        <p class="card-text">${windspeed}</p>
        <p class="card-text">Sweata weatha: ${answer}</p>
    </div>
    </div>`);
    today.append(current);

});

// Beginning of forecast API
var forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&units=imperial&appid=${apiKey}`

$.ajax({
    url: forecastQueryURL,
    method: "GET"
}).then(function(response) {
    // console.log(response);
    for (var i = 0; i < 40; i+= 8) {
        var temp = response.list[i].main.temp + "° F";
        var humid = response.list[i].main.humidity + "%";
        var wind = response.list[i].wind.speed + "MPH";
        var timestamp = response.list[i].dt;
        var date = moment.unix(timestamp).format("MM/DD/YYYY");
        var forecastIcon = response.list[i].weather[0].icon;
        var card = $(".cards")
        var details = $("<div>").html(`<div class="card" style="width: 130px; float: left; margin: 10px;">
            <div class="card-body">
                <p class="card-text">${date}</p>
                <img src="http://openweathermap.org/img/wn/${forecastIcon}@2x.png">
                <p class="card-text">${temp}</p>
                <p class="card-text">${humid}</p>
                <p class="card-text">${wind}</p>
            </div>
            </div>`)
        card.append(details)
        }
    });
})

});