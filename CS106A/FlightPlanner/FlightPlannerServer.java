/*
 * File: FlightPlannerServer.java
 * ---------------------
 * A server program that, when run, reads in information
 * about available flights from a data file, and then listens
 * for incoming network requests.  This program can respond to
 * two types of requests:
 * 
 * "getAllCities" -> we send back a list of all cities
 * "getDestinations" -> (needs parameter "city") we send back a
 *                      list of all cities reachable from the
 *                      provided city and the travel time to get 
 *                      there.
 */

import acm.program.*;
import acm.util.*;
import java.io.*;
import java.util.*;

public class FlightPlannerServer extends ConsoleProgram 
    implements SimpleServerListener {

    /* The port number where we listen for requests */
    private static final int PORT = 8080;
    
    /* The name of the file containing our flight data */
    private static final String FLIGHT_DATA_FILE = "flights.txt";
    
    /* The server object that we use to listen for requests */
    private SimpleServer server;
    
   
    public void run() {
        server = new SimpleServer(this, PORT); // Initialize a server
        server.start(); // Start the server
        println("Starting server...");
    }

    public String requestMade(Request request) {
        String cmd = request.getCommand();
        
        if (cmd.equals("getAllCities")) {
            // TODO: Fill this in
        	return "";
        } else if (cmd.equals("getDestinations")) {
            // TODO: Fill this in
        	return "";
        }
        return "Error, cannot process request: " + request;
    }

    private void readFlightData(String filename) {
        try {
            Scanner fileScanner = new Scanner(new File(filename));
            while (fileScanner.hasNextLine()) {
                String line = fileScanner.nextLine();
                if (line.length() != 0) {
                    // Make sure the line isn't blank
                    processLine(line);
                }
            }
            fileScanner.close();
        } catch (IOException ex) {
            throw new ErrorException(ex);
        }
    }

    private void processLine(String line) {
        String[] flightComponents = line.split(",");
        if (flightComponents.length != 3) {
            throw new ErrorException("Illegal entry in flights file: " + line);
        }

        String fromCity = flightComponents[0].trim();  // get the first city and get rid of spaces
        String toCity = flightComponents[1].trim();   // get the second city and get rid of spaces
        double flightTime = Double.parseDouble(flightComponents[2].trim()); //get the flight time in hours as a double

        // TODO: What should we do here?
    }
}