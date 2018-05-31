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
    error: noServer,
    dataType: "text"
  });
}

function clickHandler(event, data) {
  if (data.name === "DC") {
    swal({
      type: "error",
      title: "The District of Columbia doesn't have any voting representatives!"
    });
    return;
  }
  stateCode = data.name;
  $("#clicked-state").text(CODES_TO_STATES[stateCode]);
  getRepresentatives();
}

function noServer() {
  console.log("bruh");
  swal({
    type:"error",
    title: "Uh oh! It doesn't look like you have a server running",
    html: "<p>Make sure you've started a server and that <code>private static final int PORT = 8000;</code></p>",
    allowOutsideClick: false
  }).then((result) => {
    getRepresentatives();
  });
}

$(document).ready(function() {
  swal({
    type: "info",
    title: "Welcome to ContActivist!",
    html: `
          <p> 
            This is a sample webpage that allows you to see how a server that 
            you made for a CS106A section might be used in a real website to find out how to
            contact your state representatives. Before you get started, there are a couple of 
            things you need to do: 
          </p>
          <ol>
            <li> 
              Download the eclipse project here. 
              This project includes starter code (<code>ContActivistServer.java</code> and <code>CongressMember.java</code>), a solution (<code>ContActivistServerSolution.java</code> and <code>CongressMemberSolution.java</code>) and a 
              fully-functioning client (<code>ContActivistClient.java</code>). It also includes a <code> webpage </code> directory, which is the source of this website.
              You shouldn't need to worry about that directory, although you should feel free to peruse the code. 
            </li>
            <br>
            <li>
              Import the project into your eclipse workspace just as you would for your assignment starter code.
            </li>
            <br>
            <li>
              If you want the practice (and I think it's a great idea), try and implement the server according to the 
              <a href="http://web.stanford.edu/class/cs106a/section/9/Section9.pdf"> handout </a> in <code>ContActivistServer.java</code> and
              <code>CongressMember.java</code>.
            </li>
            <br>
            <li>
              Next, run your server. This would be either <code>ContActivistServer.java</code>, which you just wrote, or 
              <code>ContActivistServerSolution.java</code> if you just want to try it out. 
            </li>
            <br>
            <li>
              Now, you should be ready to start playing around on this webpage. Try clicking different states and buttons 
              and seeing how your server responds to them. Make sure to check your server logs if anything goes wrong. 
            </li>
          </ol>
          `,
    confirmButtonText: "I've started my server. Let's go!",
    grow: "fullscreen",
    allowOutsideClick: false
  }).then((result) => {
      if(result.value) {
        $('#map').usmap({
          stateStyles: {fill: 'teal'},
          stateHoverStyles: {fill: 'palegreen'},
          stateHoverAnimation: 300,
          stroke: '#ff0000',
          click: clickHandler
        });
      }
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

