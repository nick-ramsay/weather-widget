var currentLatitude = 0;
var currentLongitude = 0;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  currentLatitude = position.coords.latitude;
  weatherLatitude = position.coords.latitude;

  currentLongitude = position.coords.longitude;
  weatherLongitude = position.coords.longitude;

  $("#currentWeatherCity").empty();
  $("#currentWeatherIcon").empty();
  $("#currentWeatherConditions").empty();
  $(".forecastDow").empty();
  $(".forecastIconDiv").empty();
  $(".forecastLow").empty();
  $(".forecastHigh").empty();

  getCurrentWeather();
  getForecast();

}

  //window.onload = getLocation();