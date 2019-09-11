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

var dayOneWeather = {
    date: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
}

function getForecastData() {
    var cityID = 2147714;

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&APPID=6ed710fd46d2b25fcb9bcb59177fa39a";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        currentWeather.cityName = response.name,
        currentWeather.date = response.dt;
        currentWeather.currentTempKel = response.main.temp;
        currentWeather.currentTempFahr = Math.floor((currentWeather.currentTempKel - 273.15) * (9/5) + 32),
        currentWeather.longDescription = response.weather[0].description;
        currentWeather.shortDescription = response.weather[0].main;
        currentWeather.iconID = response.weather[0].icon;
        currentWeather.iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
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

}

window.onload = getForecastData();
