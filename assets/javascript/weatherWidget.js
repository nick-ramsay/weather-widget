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

function kelToFahr(kelvin) {
    return (kelvin - 273.15) * (9 / 5) + 32;
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
        currentWeather.currentTempFahr = Math.floor(kelToFahr(currentWeather.currentTempKel));
        currentWeather.longDescription = response.weather[0].description;
        currentWeather.shortDescription = response.weather[0].main;
        currentWeather.iconID = response.weather[0].icon;
        currentWeather.iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        calculateForecastDates();
    })
}

var daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var dayOneDate = new Date();
var dayTwoDate = new Date();
var dayThreeDate = new Date();
var dayFourDate = new Date();
var dayFiveDate = new Date();

function calculateForecastDates() {
    dayOneDate.setDate(dayOneDate.getDate()+1);
    dayOneWeather.dayOfWeek = daysOfWeek[dayOneDate.getDay()];
    dayOneDate = dayOneDate.toDateString();
    dayOneWeather.date = dayOneDate;

    dayTwoDate.setDate(dayTwoDate.getDate()+2);
    dayTwoWeather.dayOfWeek = daysOfWeek[dayTwoDate.getDay()];
    dayTwoDate = dayTwoDate.toDateString();
    dayTwoWeather.date = dayTwoDate;

    dayThreeDate.setDate(dayThreeDate.getDate()+3);
    dayThreeWeather.dayOfWeek = daysOfWeek[dayThreeDate.getDay()];
    dayThreeDate = dayThreeDate.toDateString();
    dayThreeWeather.date = dayThreeDate;

    dayFourDate.setDate(dayFourDate.getDate()+4);
    dayFourWeather.dayOfWeek = daysOfWeek[dayFourDate.getDay()];
    dayFourDate = dayFourDate.toDateString();
    dayFourWeather.date = dayFourDate;

    dayFiveDate.setDate(dayFiveDate.getDate()+5);
    dayFiveWeather.dayOfWeek = daysOfWeek[dayFiveDate.getDay()];
    dayFiveDate = dayFiveDate.toDateString();
    dayFiveWeather.date = dayFiveDate;
}


var dayOneWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var dayTwoWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var dayThreeWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var dayFourWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

var dayFiveWeather = {
    date: "",
    dayOfWeek: "",
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
            dayOneWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayOneWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
        } if (forecastDate === dayTwoWeather.date) {
            dayTwoWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayTwoWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
        } if (forecastDate === dayThreeWeather.date) {
            dayThreeWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayThreeWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
        } if (forecastDate === dayFourWeather.date) {
            dayFourWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayFourWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
        } if (forecastDate === dayFiveWeather.date) {
            dayFiveWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayFiveWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
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
        renderForecastData();
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

    $("#dayOneDow").text(dayOneWeather.dayOfWeek);
    $("#dayOneLow").text(Math.min.apply(null,dayOneWeather.minTemps) + '°F');
    $("#dayOneHigh").text(Math.max.apply(null,dayOneWeather.maxTemps) + '°F');

    $("#dayTwoDow").text(dayTwoWeather.dayOfWeek);
    $("#dayTwoLow").text(Math.min.apply(null,dayTwoWeather.minTemps) + '°F');
    $("#dayTwoHigh").text(Math.max.apply(null,dayTwoWeather.maxTemps) + '°F');

    $("#dayThreeDow").text(dayThreeWeather.dayOfWeek);
    $("#dayThreeLow").text(Math.min.apply(null,dayThreeWeather.minTemps) + '°F');
    $("#dayThreeHigh").text(Math.max.apply(null,dayThreeWeather.maxTemps) + '°F');

    $("#dayFourDow").text(dayFourWeather.dayOfWeek);
    $("#dayFourLow").text(Math.min.apply(null,dayFourWeather.minTemps) + '°F');
    $("#dayFourHigh").text(Math.max.apply(null,dayFourWeather.maxTemps) + '°F');

    $("#dayFiveDow").text(dayFiveWeather.dayOfWeek);
    $("#dayFiveLow").text(Math.min.apply(null,dayFiveWeather.minTemps) + '°F');
    $("#dayFiveHigh").text(Math.max.apply(null,dayFiveWeather.maxTemps) + '°F');

}

window.onload = getCurrentWeather();
window.onload = getForecast();
