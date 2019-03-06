let firstCity = "";
let currentCity = "";

var map;
var line;
var userip;
var host;
var totalDuration = 0.0;

const COORDINATES = {
  Singapore: { lat: 1.35, lng: 103.8 },
  "New York": { lat: 40.71, lng: -74 },
  "San Francisco": { lat: 37.77, lng: -122.4 },
  "Los Angeles": { lat: 34.05, lng: -118.24 },
  London: { lat: 51.5, lng: -0.128 },
  "New Delhi": { lat: 28.61, lng: 77.21 },
  Nairobi: { lat: -1.334, lng: 36.93 },
  Lima: { lat: -12.05, lng: -77.04 }
};

function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    map = L.map("map").setView(
      [position.coords.latitude, position.coords.longitude],
      5,
      { setView: true }
    );

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnJhaG0iLCJhIjoiY2pzdXYybnJzMDBmejQ0bzU5a3ZpNTVkZSJ9.XZbgIEsaq9sJ12CuCzcA_w",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox.streets"
      }
    ).addTo(map);
  });
}

function makeInitialChoices() {
  $.ajax({
    mimeType: "text/plain; charset=x-user-defined",
    url: "http://localhost:8080/getAllCities",
    success: e => updateDropDown(e, (initial = true)),
    error: e => noServer(makeInitialChoices),
    dataType: "text"
  });
}

function noServer(fn) {
  swal({
    type: "error",
    title: "Uh oh! It doesn't look like you have a server running",
    html:
      "<p>Make sure you've started a server and that <code>private static final int PORT = 8080;</code></p>",
    allowOutsideClick: false
  }).then(result => {
    fn();
  });
}

function updateDropDown(data, initial = false) {
  const cities = parseArrayList(data, initial);

  var html = "";
  for (var i = cities.length - 1; i >= 0; i--) {
    let city;
    if (initial) {
      city = cities[i];
    } else {
      city = cities[i].dest;
    }
    html += '<a class="dropdown-item countryOption" href="#">' + city;
    if (!initial) {
      html += ` (${cities[i].duration} hrs)`;
    }
    html += "</a>";
  }
  $("#cityChoices").html(html);
}

function parseCityArrayList(str) {
  const trimmed = str.substring(1, str.length - 1);
  return trimmed.split(", ");
}

function parseFlightArrayList(str) {
  const trimmed = str.substring(1, str.length - 1);
  const splitParts = trimmed.split(", ");

  const ret = [];
  for (let i = 0; i < splitParts.length; i++) {
    const route = splitParts[i];
    const splitRoute = route.split("->");
    const splitSecond = splitRoute[1].split(":");
    const flightInfo = {
      source: splitRoute[0],
      dest: splitSecond[0],
      duration: parseFloat(splitSecond[1])
    };
    ret.push(flightInfo);
  }

  return ret;
}

function parseArrayList(data, initial) {
  if (initial) {
    return parseCityArrayList(data);
  }
  return parseFlightArrayList(data);
}

function successfulGetDestinations(data) {
  $("#currentCity").text("You are currently in: " + currentCity);
  $("#itinerary").append(
    '<li class="list-group-item">' + currentCity + "</li>"
  );
  updateDropDown(data);
}

function updatePanes() {
  $.ajax({
    mimeType: "text/plain; charset=x-user-defined",
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
    text: `You'll be flying for around ${Math.round(
      totalDuration
    )} hours. Enjoy your trip!`,
    imageUrl:
      "http://bestanimations.com/Transport/Aircraft/plane-travel-animated-gif-4.gif",
    imageWidth: 300,
    imageHeight: 200,
    animation: false,
    customClass: "animated flipInX",
    allowOutsideClick: false
  });
}

$(document).on("click", ".countryOption", function(e) {
  const prevCity = currentCity;
  let selectedStr = e.currentTarget.innerHTML;
  let selectedCity = "";
  if (selectedStr.includes("(")) {
    selectedCity = selectedStr.substring(0, selectedStr.indexOf("(") - 1);

    const duration = parseFloat(
      selectedStr.substring(
        selectedStr.indexOf("(") + 1,
        selectedStr.indexOf(")") - 4
      )
    );
    console.log(duration);
    totalDuration += duration;
  } else {
    selectedCity = selectedStr;
  }
  currentCity = selectedCity;

  const srcPosition = COORDINATES[prevCity];
  const destPosition = COORDINATES[currentCity];
  console.log(srcPosition);
  if (srcPosition !== undefined) {
    console.log("drawing");
    const src = new L.LatLng(srcPosition.lat, srcPosition.lng);
    const dest = new L.LatLng(destPosition.lat, destPosition.lng);

    var Geodesic = L.geodesic(
      [
        [
          [srcPosition.lat, srcPosition.lng],
          [destPosition.lat, destPosition.lng]
        ]
      ],
      {
        opacity: 1,
        color: "red",
        steps: 50
      }
    ).addTo(map);
  }
  const coords = [destPosition.lat, destPosition.lng];
  map.panTo(coords, {
    animate: true,
    duration: 2
  });

  var marker = L.marker(coords, {
    autoPan: false
  }).addTo(map);
  var popup = L.popup({ autoPan: false }).setContent(`<b>${currentCity}</b>`);
  marker.bindPopup(popup).openPopup();

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
  initMap();
  $.get("https://jsonip.com/", function(r) {
    userip = r.ip;
    host = userip.toString() + ":8080";
  });
  swal({
    type: "info",
    text:
      "This website requires your location to display a map. Most modern browsers should ask you to confirm this.",
    confirmButtonText: "I've given the page my location",
    allowOutsideClick: false
  }).then(result => {
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
    }).then(result => {
      if (result.value) {
        makeInitialChoices();
      }
    });
  });
});
