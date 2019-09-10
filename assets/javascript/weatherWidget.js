var currentWeather = {
    cityName: "",
    date: "",
    dateText: "",
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
    dateText: "",
    dateDayOfWeek: "",
    minTemps: [],
    maxTemps: [],
    iconID: "",
    iconURL: ""
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
        currentWeather.date = response.list[0].dt_txt;
        currentWeather.currentTempKel = response.list[0].main.temp;
        currentWeather.currentTempFahr = Math.floor((currentWeather.currentTempKel - 273.15) * (9/5) + 32),
        currentWeather.longDescription = response.list[0].weather.description;
        currentWeather.shortDescription = response.list[0].weather[0].main;
        currentWeather.iconID = response.list[0].weather[0].icon;
        currentWeather.iconURL = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";

        var currentDate = new Date(currentWeather.date);
        var dayOne = new Date(currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate());
        console.log(dayOne);
        dayOne = new Date(dayOne.setDate(currentDate.getDate() + 1))

        console.log(dayOne);

        console.log(new Date(response.list[10].dt_txt))

        for (i=0; new Date(response.list[i].dt_txt) === dayOne; i++) {
            console.log("Test Day One");
        }

        var dayTwo = currentDate;
        dayTwo = new Date(dayOne.setDate(currentDate.getDate()+ 2))

        var dayThree = currentDate;
        dayThree = new Date(dayThree.setDate(currentDate.getDate()+ 3))

        var dayFour = currentDate;
        dayFour = new Date(dayFour.setDate(currentDate.getDate()+ 4))

        var dayFive = currentDate;
        dayFive = new Date(dayFive.setDate(currentDate.getDate()+ 5))

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