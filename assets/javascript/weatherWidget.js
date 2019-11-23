var weatherLatitude = -33.8688;
var weatherLongitude = 151.2093;

var currentWeather = {
    cityName: "",
    countryName: "",
    date: "",
    currentTempKel: 0,
    currentTempFahr: 0,
    longDescription: "",
    shortDescription: "",
    iconID: "",
    iconURL: ""
}

var dayOneWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconIDs: [],
    iconURL: ""
}

var dayTwoWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconIDs: [],
    iconURL: ""
}

var dayThreeWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconIDs: [],
    iconURL: ""
}

var dayFourWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconIDs: [],
    iconURL: ""
};

var dayFiveWeather = {
    date: "",
    dayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconIDs: [],
    iconURL: ""
};

var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var dayOneDate = new Date();
var dayTwoDate = new Date();
var dayThreeDate = new Date();
var dayFourDate = new Date();
var dayFiveDate = new Date();

function kelToFahr(kelvin) {
    return (kelvin - 273.15) * (9 / 5) + 32;
}

function getWeeklyDates() {
    dayOneDate = new Date();
    dayTwoDate = new Date();
    dayThreeDate = new Date();
    dayFourDate = new Date();
    dayFiveDate = new Date();
};

function calculateForecastDates() {
    dayOneDate.setDate(dayOneDate.getDate() + 1);
    dayOneWeather.dayOfWeek = daysOfWeek[dayOneDate.getDay()];
    dayOneDate = dayOneDate.toDateString();
    dayOneWeather.date = dayOneDate;

    dayTwoDate.setDate(dayTwoDate.getDate() + 2);
    dayTwoWeather.dayOfWeek = daysOfWeek[dayTwoDate.getDay()];
    dayTwoDate = dayTwoDate.toDateString();
    dayTwoWeather.date = dayTwoDate;

    dayThreeDate.setDate(dayThreeDate.getDate() + 3);
    dayThreeWeather.dayOfWeek = daysOfWeek[dayThreeDate.getDay()];
    dayThreeDate = dayThreeDate.toDateString();
    dayThreeWeather.date = dayThreeDate;

    dayFourDate.setDate(dayFourDate.getDate() + 4);
    dayFourWeather.dayOfWeek = daysOfWeek[dayFourDate.getDay()];
    dayFourDate = dayFourDate.toDateString();
    dayFourWeather.date = dayFourDate;

    dayFiveDate.setDate(dayFiveDate.getDate() + 5);
    dayFiveWeather.dayOfWeek = daysOfWeek[dayFiveDate.getDay()];
    dayFiveDate = dayFiveDate.toDateString();
    dayFiveWeather.date = dayFiveDate;
}

function getCurrentWeather() {
    getWeeklyDates();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + weatherLatitude + "&lon=" + weatherLongitude + "&APPID=6ed710fd46d2b25fcb9bcb59177fa39a";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        currentWeather.cityName = response.name;
        currentWeather.countryName = response.sys.country;
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

var forecastData;

function getForecast() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + weatherLatitude + "&lon=" + weatherLongitude + "&APPID=6ed710fd46d2b25fcb9bcb59177fa39a";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (forecastResponse) {
        forecastData = forecastResponse;
        parseForecastData();
    })
}

function clearForecastData() {
    dayOneWeather.minTemps = [];
    dayOneWeather.maxTemps = [];
    dayOneWeather.iconIDs = [];
    dayOneWeather.iconURL = "";
    
    dayTwoWeather.minTemps = [];
    dayTwoWeather.maxTemps = [];
    dayTwoWeather.iconIDs = [];
    dayTwoWeather.iconURL = "";

    dayThreeWeather.minTemps = [];
    dayThreeWeather.maxTemps = [];
    dayThreeWeather.iconIDs = [];
    dayThreeWeather.iconURL = "";

    dayFourWeather.minTemps = [];
    dayFourWeather.maxTemps = [];
    dayFourWeather.iconIDs = [];
    dayFourWeather.iconURL = "";
} 

function parseForecastData() {
    clearForecastData();

    for (i = 0; i < forecastData.cnt; i++) {
        var forecastDate = new Date(forecastData.list[i].dt * 1000);
        forecastDate = forecastDate.toDateString();
        if (forecastDate === dayOneWeather.date) {
            dayOneWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayOneWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
            dayOneWeather.iconIDs.push(forecastData.list[i].weather[0].icon);
            dayOneWeather.iconURL = "http://openweathermap.org/img/wn/" + dayOneWeather.iconIDs[5] + "@2x.png";
        } if (forecastDate === dayTwoWeather.date) {
            dayTwoWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayTwoWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
            dayTwoWeather.iconIDs.push(forecastData.list[i].weather[0].icon);
            dayTwoWeather.iconURL = "http://openweathermap.org/img/wn/" + dayTwoWeather.iconIDs[5] + "@2x.png";
        } if (forecastDate === dayThreeWeather.date) {
            dayThreeWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayThreeWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
            dayThreeWeather.iconIDs.push(forecastData.list[i].weather[0].icon);
            dayThreeWeather.iconURL = "http://openweathermap.org/img/wn/" + dayThreeWeather.iconIDs[5] + "@2x.png";
        } if (forecastDate === dayFourWeather.date) {
            dayFourWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayFourWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
            dayFourWeather.iconIDs.push(forecastData.list[i].weather[0].icon);
            dayFourWeather.iconURL = "http://openweathermap.org/img/wn/" + dayFourWeather.iconIDs[5] + "@2x.png";
        } if (forecastDate === dayFiveWeather.date) {
            dayFiveWeather.minTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_min)));
            dayFiveWeather.maxTemps.push(Math.floor(kelToFahr(forecastData.list[i].main.temp_max)));
            dayFiveWeather.iconIDs.push(forecastData.list[i].weather[0].icon);
            dayFiveWeather.iconURL = "http://openweathermap.org/img/wn/" + dayFiveWeather.iconIDs[4] + "@2x.png";
        }
    }
    renderForecastData();
}

function renderForecastData() {
    $("#currentWeatherCity").empty();
    $("#currentWeatherIcon").empty();
    $("#currentWeatherConditions").empty();
    $(".forecastDow").empty();
    $(".forecastIconDiv").empty();
    $(".forecastHigh").empty();
    $(".forecastLow").empty();

    var currentWeatherCity = $('<p id="locationDetails"><span id="cityName">' + currentWeather.cityName + '</span><span id="country"> ' + currentWeather.countryName + '  </span><a><img id="changeLocation" src="assets/images/location_icon.png"></a></p>');
    $("#currentWeatherCity").append(currentWeatherCity);
    var currentWeatherIcon = $("<img>");
    $(currentWeatherIcon).attr("src", currentWeather.iconURL);
    $(currentWeatherIcon).attr("id", "currentWeatherImg");
    $("#currentWeatherIcon").append(currentWeatherIcon);
    var currentWeatherConditions = $('<p id="currentTemp">' + currentWeather.currentTempFahr + '°F</p><p id="currentConditions">' + currentWeather.shortDescription + '</p>');
    $("#currentWeatherConditions").append(currentWeatherConditions);

    $("#dayOneDow").text(dayOneWeather.dayOfWeek);
    $("#dayOneLow").text(Math.min.apply(null, dayOneWeather.minTemps) + '°F');
    $("#dayOneHigh").text(Math.max.apply(null, dayOneWeather.maxTemps) + '°F');
    var dayOneIcon = $('<img class="forecastIcon" id="dayOneIcon" alt="Forecast #1 Icon">');
    $(dayOneIcon).attr("src", dayOneWeather.iconURL);
    $("#dayOneIconDiv").append(dayOneIcon);

    $("#dayTwoDow").text(dayTwoWeather.dayOfWeek);
    $("#dayTwoLow").text(Math.min.apply(null, dayTwoWeather.minTemps) + '°F');
    $("#dayTwoHigh").text(Math.max.apply(null, dayTwoWeather.maxTemps) + '°F');
    var dayTwoIcon = $('<img class="forecastIcon" id="dayTwoIcon" alt="Forecast #2 Icon">');
    $(dayTwoIcon).attr("src", dayTwoWeather.iconURL);
    $("#dayTwoIconDiv").append(dayTwoIcon);

    $("#dayThreeDow").text(dayThreeWeather.dayOfWeek);
    $("#dayThreeLow").text(Math.min.apply(null, dayThreeWeather.minTemps) + '°F');
    $("#dayThreeHigh").text(Math.max.apply(null, dayThreeWeather.maxTemps) + '°F');
    var dayThreeIcon = $('<img class="forecastIcon" id="dayThreeIcon" alt="Forecast #3 Icon">');
    $(dayThreeIcon).attr("src", dayThreeWeather.iconURL);
    $("#dayThreeIconDiv").append(dayThreeIcon);

    $("#dayFourDow").text(dayFourWeather.dayOfWeek);
    $("#dayFourLow").text(Math.min.apply(null, dayFourWeather.minTemps) + '°F');
    $("#dayFourHigh").text(Math.max.apply(null, dayFourWeather.maxTemps) + '°F');
    var dayFourIcon = $('<img class="forecastIcon" id="dayFourIcon" alt="Forecast #4 Icon">');
    $(dayFourIcon).attr("src", dayFourWeather.iconURL);
    $("#dayFourIconDiv").append(dayFourIcon);
}

window.onload = getCurrentWeather();
window.onload = getForecast();
window.onload = getLocation();
