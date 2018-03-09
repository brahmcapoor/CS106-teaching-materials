# FlightPlanner!

Download the eclipse project (including the web demo) [here](https://github.com/brahmcapoor/CS106-teaching-materials/raw/master/CS106A/FlightPlanner/download.zip)

## Summary

This is a program based on the section 8 handout of CS 106A Winter Quarter 2018 at Stanford University. The genuinely important things are as follows:

* `FlightPlannerClient.java`: a fully featured client
* `FlightPlannerServer.java`: a server that students need to implement
* `FlightPlannerServerSoln.java`: solution code for the server (to be posted after I teach section)

The `webpage` directory has resources for a web client to show students for fun. At this point, I can't think of anything else that might be important but this document will be uploaded as necessary. 

## How to use the web demo
_Note: While this section of this document is intended for section leaders, any enterprising 106 students and/or viewers of this repo are welcome to try to do this as well._


_Note redux: A previous version of this readme instructed you to install a CORS extension for Chrome and/or firefox. You no longer need to do this, since CORS is now enabled in `SimpleServer.jar`._

1) Download the Eclipse project from this repo and import it as you normally would.
2) Run `FlightPlannerServer.java` or `FlightPlannerServerSoln.java` from Eclipse, making sure that `private static final int PORT = 8080;`
3) Open `webpage/index.html` in your browser.
4) The demo should just work now. If anything weird comes up, shoot me an email at brahm@stanford.edu. 
