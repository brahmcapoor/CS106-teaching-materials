let firstCity = ""
let currentCity = "";

var map;
var flightPath = [];
var line;

const COORDINATES = {
  "Singapore": {lat: 1.35, lng: 103.8},
  "New York": {lat: 40.71, lng: -74},
  "San Francisco": {lat: 37.77, lng: -122.4},
  "Los Angeles": {lat: 34.05, lng: -118.24},
  "London": {lat: 51.5, lng: -0.128},
  "New Delhi": {lat: 28.61, lng: 77.21}
}

function initMap() {
  console.log("Initializing");
  navigator.geolocation.getCurrentPosition(function(position){
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: position.coords.latitude, lng: position.coords.longitude},
          zoom: 3
    });
  });  
}

function makeInitialChoices() {
  $.ajax({
    mimeType: 'text/plain; charset=x-user-defined',
    url: "http://localhost:8080/getAllCities",
    success: updateDropDown,
    dataType: "text"
  });
}


function updateDropDown(data) {
  const cities = parseArrayList(data);
    var html = "";
    for (var i = cities.length - 1; i >= 0; i--) {
      var city = cities[i];
      html += '<a class="dropdown-item countryOption" href="#">'+ city + '</a>'
    }
    $("#cityChoices").html(html);
}

function parseArrayList(str) {
  const trimmed = str.substring(1, str.length - 1);
  return trimmed.split(", ");
}

function updatePanes(over=false) {
  $("#currentCity").text("You are currently in: " + currentCity);
  $("#itinerary").append('<li class="list-group-item">' + currentCity + '</li>');
  $.ajax({
    mimeType: 'text/plain; charset=x-user-defined',
    url: "http://localhost:8080/getDestinations?city=" + currentCity,
    success: updateDropDown,
    dataType: "text"
  });
}

function endTrip() {
  $("#selectionPane").remove();
  swal({
    type: "success",
    title: "You're done!",
    text: "Enjoy your trip!",
    imageUrl: "http://bestanimations.com/Transport/Aircraft/plane-travel-animated-gif-4.gif",
    imageWidth: 300,
    imageHeight: 200,
    animation: false,
    customClass: 'animated flipInX',
    backdrop: `
      rgba(64,64,64,0.8)
      url("/images/nyan-cat.gif")
      center left
      no-repeat
    `,
    allowOutsideClick: false
  });
}

$(document).on("click", ".countryOption", function(e) {
  const selectedCity = e.currentTarget.innerHTML;
  currentCity = selectedCity;
  flightPath.push(COORDINATES[currentCity]);
  map.panTo(COORDINATES[currentCity]);
  line = new google.maps.Polyline({
    path: flightPath,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  line.setMap(map);
  if (firstCity === currentCity) {
    endTrip(true);
  }

  if (firstCity === "") {
    firstCity = selectedCity;
    $("#chooseDestinationsButton").text("Choose your next stop!");
  }

  updatePanes();
});

$(document).ready(function() {
  makeInitialChoices();
})

