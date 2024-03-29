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

  getCurrentWeather();
  getForecast();

}

var selectedLatitude = -33.856159;
var selectedLongitude = 151.215256;

function selectedLocation() {
  selectedLocationURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + selectedLatitude + ',' + selectedLongitude + '&key=${{secrets.GOOGLE_MAPS_API_KEY}}';

  $.ajax({
    url: selectedLocationURL,
    method: "GET"
  }).then(function (response) {
    $("#selectedLocation").text(response.results[0].formatted_address);
  }
  )
}

//START: Code for changing location via Google

var addressSearchInput;
var newAddressURL;

function changeSelectedAddress() {
  $.ajax({
    url: newAddressURL,
    method: "GET"
  }).then(function (response) {
    selectedLatitude = response.results[0].geometry.location.lat;
    selectedLongitude = response.results[0].geometry.location.lng;
    
    currentLatitude = selectedLongitude;
    weatherLatitude = selectedLatitude;

    currentLongitude = selectedLatitude;
    weatherLongitude = selectedLongitude;

    getCurrentWeather();
    getForecast();
    selectedLocation();
  })
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'), { types: ['geocode'] });

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  addressSearchInput = "";
  newAddressURL = "";
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();


  for (var i = 0; i < place.address_components.length; i++) {
    addressSearchInput = addressSearchInput + place.address_components[i].long_name + " ";
  }
  addressSearchInput = addressSearchInput.replace(/ /g, "+");
  newAddressURL = ('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressSearchInput + '&key=${{secrets.GOOGLE_MAPS_API_KEY}}');
  changeSelectedAddress();
  locationParametersClose();
}

function locationParametersOpen() {
  $("#changeLocation").hide();
  $("#locationParameters").show();
}

function locationParametersClose() {
  $("#locationParameters").hide();
  $("#changeLocation").show();
}

$(document).on("click", "#changeLocation", locationParametersOpen);
$(document).on("click", ".closeLocationParameters", locationParametersClose);

  //window.onload = getLocation();