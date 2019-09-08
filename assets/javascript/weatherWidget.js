var currentWeather = {
    cityName: "",
    date: "",
    currentTempKel: 0,
    currentTempFahr: (this.currentTempKel - 273.15) * (9/5) + 32,
    longDescription: "",
    shortDescription: "",
    iconID: "",
    iconURL: ""
    //iconURL: "http://openweathermap.org/img/wn/" + this.iconID + "@2x.png"
}

function getForecastData() {
    var cityID = 2147714;

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&APPID=6ed710fd46d2b25fcb9bcb59177fa39a";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        currentWeather.cityName = response.city.name,
        currentWeather.currentTempKel = response.list[0].main.temp;
        currentWeather.longDescription = response.list[0].dt;
        currentWeather.longDescription = response.list[0].weather.description;
        currentWeather.shortDescription = response.list[0].weather[0].main;
        currentWeather.iconID = response.list[0].weather[0].icon;
        currentWeather.iconURL = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
        renderForecastData();
    })
}

function renderForecastData() {
    var currentWeatherCity = $("<p>" + currentWeather.cityName + "</p><p>Weather</p>");
    $("#currentWeatherCity").append(currentWeatherCity);
    var currentWeatherIcon = $("<img>");
    $(currentWeatherIcon).attr("src", currentWeather.iconURL);
    $("#currentWeatherIcon").append(currentWeatherIcon);
    var currentWeatherConditions = $("<p>" + currentWeather.currentTempKel + "°K</p><p>" + currentWeather.shortDescription + "</p>");
    $("#currentWeatherConditions").append(currentWeatherConditions);
}

window.onload = getForecastData();