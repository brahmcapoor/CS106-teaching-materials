let firstCity = ""
let currentCity = "";

var map;
var flightPath = [];
var line;
var userip;
var host;

const COORDINATES = {
  "Singapore": {lat: 1.35, lng: 103.8},
  "New York": {lat: 40.71, lng: -74},
  "San Francisco": {lat: 37.77, lng: -122.4},
  "Los Angeles": {lat: 34.05, lng: -118.24},
  "London": {lat: 51.5, lng: -0.128},
  "New Delhi": {lat: 28.61, lng: 77.21}
}

function initMap() {
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
    error: e => noServer(makeInitialChoices),
    dataType: "text"
  });
}

function noServer(fn) {
  swal({
    type:"error",
    title: "Uh oh! It doesn't look like you have a server running",
    html: "<p>Make sure you've started a server and that <code>private static final int PORT = 8080;</code></p>",
    allowOutsideClick: false
  }).then((result) => {
    fn();
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

function successfulGetDestinations(data) {
  $("#currentCity").text("You are currently in: " + currentCity);
  $("#itinerary").append('<li class="list-group-item">' + currentCity + '</li>');
  updateDropDown(data);
}

function updatePanes() {
  $.ajax({
    mimeType: 'text/plain; charset=x-user-defined',
    url: "http://localhost:8080/getDestinations?city=" + currentCity,
    success: successfulGetDestinations,
    error: e => noServer(updatePanes),
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
  $.get('https://jsonip.com/', function(r){ 
    userip = r.ip;
    host =  userip.toString() + ":8080";
  });
  swal({
    type: "info",
    text: "This website requires your location to display a Google Map. Most modern browsers should ask you to confirm this.",
    confirmButtonText: "I've given the page my location",
    allowOutsideClick: false
  }).then((result) => {
    swal({
    type: "info",
    title: "Welcome to FlightPlanner!",
    html: `
          <p> 
            This is a sample webpage that allows you to see how a server that 
            you made for a CS106A section might be used in a real website like 
            Google Flights or Kayak. Before you get started, there are 
            a couple of things you need to do: 
          </p>
          <ol>
            <li> 
              Download the eclipse project <a href="https://github.com/brahmcapoor/CS106-teaching-materials/raw/master/CS106A/FlightPlanner/download.zip"> here </a>. 
              This project includes starter code (<code>FlightPlannerServer.java</code>), a solution (<code>FlightPlannerServerSolution.java</code>) and a 
              fully-functioning client (<code>FlightPlannerClient.java</code>). It also includes a <code> webpage </code> directory, which is the source of this website.
              You shouldn't need to worry about that directory, although you should feel free to peruse the code. 
            </li>
            <br>
            <li>
              Import the project into your eclipse workspace just as you would for your assignment starter code.
            </li>
            <br>
            <li>
              If you want the practice (and I think it's a great idea), try and implement the server according to the 
              <a href="http://web.stanford.edu/class/cs106a/section/8/Section8.pdf"> handout </a> in <code>FlightPlannerServer.java</code>.
            </li>
            <br>
            <li>
              Next, run your server. This would be either <code>FlightPlannerServer.java</code>, which you just wrote, or 
              <code>FlightPlannerServerSolution.java</code> if you just want to try it out. 
            </li>
            <br>
            <li>
              Now, you should be ready to start playing around on this webpage. Try making different itineraries and seeing how your server
              responds to them. Make sure to check your server logs if anything goes wrong. 
            </li>
          </ol>
          `,
    confirmButtonText: "I've started my server. Let's go!",
    grow: "fullscreen",
    allowOutsideClick: false
  }).then((result) => {
      if(result.value) {
        makeInitialChoices();
      }
  });
  });
});

