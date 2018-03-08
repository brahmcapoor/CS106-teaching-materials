#FlightPlanner!

## Summary

This is a program based on the section 8 handout of CS 106A Winter Quarter 2018 at Stanford University. The genuinely important things are as follows:

* `FlightPlannerClient.java`: a fully featured client
* `FlightPlannerServer.java`: a server that students need to implement
* `FlightPlannerServerSoln.java`: solution code for the server (to be posted after I teach section)

The `webpage` directory has resources for a web client to show students for fun. At this point, I can't think of anything else that might be important but this document will be uploaded as necessary. 

## How to use the web demo
_Note: While this section of this document is intended for section leaders, any enterprising 106 students and/or viewers of this repo are welcome to try to do this as well._


The one slight issue with this is that in order for the browser to communicate effectively with the server, it needs to allow Cross-Origin Resource Sharing. I did just enough googling to understand that this needed to happen, but not enough to even remotely comprensibly explain it to anyone at 1:30 in the morning, but the crux of the matter is that I installed a browser extension to let it happen. If you'd like to use the demo, install one of the following:

Firefox: [CORS everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)
Chrome: [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

For what it's worth, I've only tested the Firefox extension, but nothing in my (very limited) understanding of this suggests that the chrome one won't work. 

0) Download the Eclipse project from this repo and import it as you normally would.
1) Enable the extension for the duration of the demo (this feels _just_ janky enough that it's probably suspicious). Remember to turn it off again afterwards.
2) Run `FlightPlannerServer.java` or `FlightPlannerServerSoln.java` from Eclipse, making sure that `private static final int PORT = 8080;`
3) `cd` to the `webpage` project in the directory and run `python -m SimpleHttpServer`. If you're on Windows or for some reason don't have python installed, opening `index.html` will probably be okay. Testing this is for people with more sleep than I am currently running on, so take that with a grain of salt. 
4) The demo should just work now. If anything weird comes up, shoot me an email at brahm@stanford.edu. 