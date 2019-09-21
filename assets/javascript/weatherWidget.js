var currentWeather = {
    cityName: "",
    date: "",
    currentTempKel: 0,
    currentTempFahr: 0,
    longDescription: "",
    shortDescription: "",
    iconID: "",
    iconURL: ""
    //iconURL: "http://openweathermap.org/img/wn/" + this.iconID + "@2x.png"
}

function getCurrentWeather() {
    var cityID = 2147714;
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&APPID=6ed710fd46d2b25fcb9bcb59177fa39a";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        currentWeather.cityName = response.name;
        currentWeather.date = response.dt;
        currentWeather.currentTempKel = response.main.temp;
        currentWeather.currentTempFahr = Math.floor((currentWeather.currentTempKel - 273.15) * (9 / 5) + 32);
        currentWeather.longDescription = response.weather[0].description;
        currentWeather.shortDescription = response.weather[0].main;
        currentWeather.iconID = response.weather[0].icon;
        currentWeather.iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        calculateForecastDates();
        renderForecastData();
    })
}

var dayOneDate = new Date();
var dayTwoDate = new Date();
var dayThreeDate = new Date();
var dayFourDate = new Date();
var dayFiveDate = new Date();

function calculateForecastDates() {
    dayOneDate.setDate(dayOneDate.getDate()+1);
    dayOneDate = dayOneDate.toDateString();
    dayOneWeather.date = dayOneDate;

    dayTwoDate.setDate(dayTwoDate.getDate()+2);
    dayTwoDate = dayTwoDate.toDateString();
    dayTwoWeather.date = dayTwoDate;

    dayThreeDate.setDate(dayThreeDate.getDate()+3);
    dayThreeDate = dayThreeDate.toDateString();
    dayThreeWeather.date = dayThreeDate;

    dayFourDate.setDate(dayFourDate.getDate()+4);
    dayFourDate = dayFourDate.toDateString();
    dayFourWeather.date = dayFourDate;

    dayFiveDate.setDate(dayFiveDate.getDate()+5);
    dayFiveDate = dayFiveDate.toDateString();
    dayFiveWeather.date = dayFiveDate;
}


var dayOneWeather = {
    date: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var dayTwoWeather = {
    date: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var dayThreeWeather = {
    date: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var dayFourWeather = {
    date: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var dayFiveWeather = {
    date: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var forecastData;

function parseForecastData () {
    console.log(forecastData);
    for (i=0; i < forecastData.cnt; i++) {
        var forecastDate = new Date(forecastData.list[i].dt * 1000);
        forecastDate = forecastDate.toDateString();
        if (forecastDate === dayOneWeather.date) {
            dayOneWeather.minTemps.push(forecastData.list[i].main.temp_min);
            dayOneWeather.maxTemps.push(forecastData.list[i].main.temp_max);
        } if (forecastDate === dayTwoWeather.date) {
            dayTwoWeather.minTemps.push(forecastData.list[i].main.temp_min);
            dayTwoWeather.maxTemps.push(forecastData.list[i].main.temp_max);
        } if (forecastDate === dayThreeWeather.date) {
            dayThreeWeather.minTemps.push(forecastData.list[i].main.temp_min);
            dayThreeWeather.maxTemps.push(forecastData.list[i].main.temp_max);
        } if (forecastDate === dayFourWeather.date) {
            dayFourWeather.minTemps.push(forecastData.list[i].main.temp_min);
            dayFourWeather.maxTemps.push(forecastData.list[i].main.temp_max);
        } if (forecastDate === dayFiveWeather.date) {
            dayFiveWeather.minTemps.push(forecastData.list[i].main.temp_min);
            dayFiveWeather.maxTemps.push(forecastData.list[i].main.temp_max);
        }  
    }
}

function getForecast() {
    var cityID = 2147714;

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&APPID=6ed710fd46d2b25fcb9bcb59177fa39a";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        forecastData = response;
        parseForecastData();
    })
}

function renderForecastData() {
    var currentWeatherCity = $("<p style='font-weight: bold;'>" + currentWeather.cityName + "</p><p style='font-size: 12px;'>Weather</p>");
    $("#currentWeatherCity").append(currentWeatherCity);
    var currentWeatherIcon = $("<img>");
    $(currentWeatherIcon).attr("src", currentWeather.iconURL);
    $(currentWeatherIcon).attr("id", "currentWeatherImg");
    $("#currentWeatherIcon").append(currentWeatherIcon);
    var currentWeatherConditions = $("<p>" + currentWeather.currentTempFahr + "°F</p><p style='padding:0; margin:0;font-size: 12px'>" + currentWeather.shortDescription + "</p>");
    $("#currentWeatherConditions").append(currentWeatherConditions);

}

window.onload = getCurrentWeather();
window.onload = getForecast();
