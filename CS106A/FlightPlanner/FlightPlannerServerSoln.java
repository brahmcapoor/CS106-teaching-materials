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
 *                      provided city.
 */

import acm.program.*;
import acm.util.*;
import java.io.*;
import java.util.*;

public class FlightPlannerServerSoln extends ConsoleProgram 
    implements SimpleServerListener {

    /* The port number where we listen for requests */
    private static final int PORT = 8080;
    
    /* The name of the file containing our flight data */
    private static final String FLIGHT_DATA_FILE = "flights.txt";
    
    /* The server object that we use to listen for requests */
    private SimpleServer server;
    
    private HashMap<String, ArrayList<String>> destinations;

    public void run() {
        destinations = new HashMap<String, ArrayList<String>>();
        	readFlightData(FLIGHT_DATA_FILE);
        server = new SimpleServer(this, PORT);
        server.start();
        println("Starting server...");
    }

    /**
     * Deal with a request
     */
    public String requestMade(Request request) {
        String cmd = request.getCommand();
        
        if (cmd.equals("getAllCities")) {
            return getAllCities();
        } else if (cmd.equals("getDestinations")) {
        		return getDestinations(request);
        } else {
            return "Error, cannot process request: " + request;
        }
    }

    private void readFlightData(String filename) {
        try {
            Scanner fileScanner = new Scanner(new File(filename));
            while (fileScanner.hasNextLine()) {
                String line = fileScanner.nextLine();
                if (line.length() != 0) {
                    // make sure the line isn't blank
                    processLine(line);
                }
            }
            fileScanner.close();
        } catch (IOException ex) {
            throw new ErrorException(ex);
        }
    }

    private void processLine(String line) {
        int arrow = line.indexOf("->"); // find where the arrow is  
        if (arrow == -1) {
            throw new ErrorException("Illegal entry in flights file: " + line);
        }

        String fromCity = line.substring(0, arrow).trim();  // get the first city and get rid of spaces
        String toCity = line.substring(arrow + 2).trim();   // get the second city and get rid of spaces
        addToDestinations(fromCity, toCity);
    }


    /**
     * Add the fromCity -> toCity route to our map, making sure to put 
     * the key in the map if it isn't already there.
     */
    private void addToDestinations(String fromCity, String toCity) {
        if (!destinations.containsKey(fromCity)) {
            destinations.put(fromCity, new ArrayList<String>());
        }
        destinations.get(fromCity).add(toCity);
    }

    /**
     * Deal with a getAllCities request
     */
    private String getAllCities() {
        println("Received request to get all cities");
        ArrayList<String> cities = new ArrayList<String>();
        for (String city : destinations.keySet()) {
            // iterate over the keys in the map and add it to an arraylist
            cities.add(city);
        }
        String result = cities.toString();
        println("       => " + result);
        return result;
    }

    /**
     * Deal with a getDestinations request
     */
    private String getDestinations(Request request) {
        String city = request.getParam("city");
        println("Received request to getDestinations for " + city);

        ArrayList<String> possibleDestinations = destinations.get(city);
        if (possibleDestinations == null) {
            // deal with the case where there are no destinations from here
            // and so we shouldn't call toString on a string that doesn't exist!
            return null;
        } 
        return possibleDestinations.toString();
    }
}

