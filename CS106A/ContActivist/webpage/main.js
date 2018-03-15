const HOST = "http://localhost:8000/"
var phone = true;
var stateCode = "";

const CODES_TO_STATES = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

function parseResponse(response) {
  response = response.substr(0, response.length - 1);
  const lines = response.split("\n");
  const members = [];
  lines.forEach(function(line) {
    line = line.split(" ");
    var separator_idx = phone ? 2 : 1;
    if (line.includes("email")) {
      separator_idx = 2;
    }
    const member = {
      name: line.slice(0, line.length - separator_idx).join(" "),
      detail: line.slice(line.length - separator_idx).join(" ")
    };
    members.push(member);
  });
  members.sort(function(m1, m2) { return m1.detail < m2.detail })
  return members;
}

function updatePane(response) {
  const memberDetails = parseResponse(response);
  $("#reps").empty();
  memberDetails.forEach(function(member) {
    var detail = member.detail;
    if (!phone && detail != "No email") {
      detail = '<a href="' + detail + '" target="_blank">' + detail + '</a>';
    }
    $("#reps").append("<tr><td>" + member.name + "</td><td>" + detail + "</td></tr>");
  })

}

async function getRepresentatives() {
  const command = phone ? "getCongressPhonesForState" : "getCongressEmailsForState"
  const url = HOST + command + "?stateCode=" + stateCode;
  $.ajax({
    mimeType: 'text/plain; charset=x-user-defined',
    url: url,
    success: e => updatePane(e),
    error: e => console.log(e),
    dataType: "text"
  });
}

function clickHandler(event, data) {
  stateCode = data.name;
  $("#clicked-state").text(CODES_TO_STATES[stateCode]);
  getRepresentatives();
}

$(document).ready(function() {
  $('#map').usmap({
    stateStyles: {fill: 'teal'},
    stateHoverStyles: {fill: 'palegreen'},
    stateHoverAnimation: 300,
    stroke: '#ff0000',
    click: clickHandler
  });
});

$("#phoneButton").on('click', function () {
  $("#phoneButton").removeClass("btn-light").addClass("btn-primary");
  $("#emailButton").removeClass("btn-primary").addClass("btn-light");
  $("#detailCol").text("Phone number");
  phone = true;
  if (stateCode != "") getRepresentatives();
});

$("#emailButton").on('click', function () {
  $("#emailButton").removeClass("btn-light").addClass("btn-primary");
  $("#phoneButton").removeClass("btn-primary").addClass("btn-light");
  $("#detailCol").text("Email Link");
  phone = false;
  if (stateCode != "") getRepresentatives();
})

