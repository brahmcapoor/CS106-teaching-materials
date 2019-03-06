/*
 * File: FlightPlannerClient.java
 * ------------------
 * A client program that talks to a flight server to allow
 * a user to plan out a flight path from a starting city
 * back to that starting city.
 */

import acm.program.*;
import java.io.*;
import java.util.*;

public class FlightPlannerClient extends ConsoleProgram {
    
    /* The network address for the flights server we should contact */
    private static final String HOST = "http://localhost:8080/";
    
    public void run() {
        println("Welcome to Flight Planner!");      
        println("Here's a list of all the cities in our database:");        
        ArrayList<String> cities = fetchCitiesList();
        if (cities == null) {
            println("Error: could not get list of all cities");
            return;
        }
        printCityList(cities);
        
        ArrayList<String> route = readInFlightRoute();
        if (route == null) {
            println("Error: could not get destinations");
            return;
        }
        printRoute(route);
    }
    
    /**
     * Prompts the user for cities to travel to until they end in
     * the same city in which they started.  Returns null if we weren't
     * able to get a response for a network request.
     */
    private ArrayList<String> readInFlightRoute() {
        println("Let's plan a round-trip route!");
        String startCity = readLine("Enter the starting city: ");
        startCity = "x->" + startCity + ":0.00";
        ArrayList<String> route = new ArrayList<String>();
        route.add(startCity);
        String currentCity = startCity;
        
        while (true) {
            String nextCity = getNextCity(getDestination(currentCity));
            if (nextCity == null) {
                // An error occurred
                return null;
            }
            route.add(nextCity);
            if (getDestination(nextCity).equals(getDestination(startCity))) {
                break;
            }
            currentCity = nextCity;
        }
        
        return route;
    }
    
    /**
     * Returns the list of all cities that the user can start at,
     * or null if we weren't able to get a response to our request.
     */
    private ArrayList<String> fetchCitiesList() {
        try {
            // The getAllCities request needs no parameters
            Request request = new Request("getAllCities");
            String result = SimpleClient.makeRequest(HOST, request);
            return makeListFromString(result);
        } catch (IOException e) {
            return null;
        }
    }
    
    /** 
     * Fetches all the cities the user could travel to from the given
     * city, and prompts them for a destination until they enter one
     * of these cities. Then returns the city they chose.  If we 
     * weren't able to get a response for our request of destinations 
     * for this city, this method returns null.
     */
    private String getNextCity(String city) {
        ArrayList<String> destinations = fetchDestinations(city);
        if (destinations == null) {
            // An error occurred
            return null;
        }
        
        String nextCity = null;
        while (true) {
            println("From " + city + " you can fly directly to:");
            printCityListWithTimes(destinations);
            String prompt = "Where do you want to go from " 
                + city + "? ";
            nextCity = readLine(prompt);
            if (hasDestination(destinations, nextCity)) break;
            println("You can't get to that city by a direct flight.");
        }
        return findDestination(destinations, nextCity);
    }
    
    /**
     * Returns a list of cities that can be reached from the given 
     * city. Returns null if we weren't able to get a response to our 
     * request.
     */
    private ArrayList<String> fetchDestinations(String city) {
        try {
            /* The getDestinations request has a "city" parameter
             * that is the name of the city to get destinations for.
             */
            Request request = new Request("getDestinations");
            request.addParam("city", city);
            String result = SimpleClient.makeRequest(HOST, request);
            return makeListFromString(result);
        } catch (IOException e) {
            return null;
        }
    }   

    /**
     * Prints a list of cities from the provided list. Each city name 
     * is indented by a space.
     */
    private void printCityList(ArrayList<String> cityList) {
        for(int i = 0; i < cityList.size(); i++) {
            String city = cityList.get(i);
            println(" " + city);
        }
    }
    
    private void printCityListWithTimes(ArrayList<String> cityList) {
        for(int i = 0; i < cityList.size(); i++) {
            String city = cityList.get(i);
            String destination = getDestination(city);
            String time = getDateString(getTime(city));
            println(" " + destination + " (" + time + ")");
        }
    }

    /**
     * Given a list of city names, prints out the flight
     * route, with a " -> " between each pair of cities
     */
    private void printRoute(ArrayList<String> route) {
        println("The route you've chosen is: ");
        double totalTime = 0;
        for (int i = 0; i < route.size(); i++) {
            if (i > 0) print(" -> ");
            print(getDestination(route.get(i)));
            totalTime += getTime(route.get(i));
        }
        print(" (Total Travel Time: " + getDateString(totalTime) + ")");
        println();
    }
    
    /**
     * (PROVIDED)
     * This is a wonderfully useful method that takes a list in string
     * form and turns it into and ArrayList. For example the string:
     *   "[cs106a, rocks, socks]" 
     * will return an ArrayList with three elements:
     * "cs106a" "rocks" and "socks"
     */
    private ArrayList<String> makeListFromString(String listStr) {
        ArrayList<String> list = new ArrayList<String>();
        String raw = listStr.substring(1, listStr.length() - 1);
        String[] parts = raw.split(",");
        for(String part : parts) {
            String str = part.trim();
            if(!str.isEmpty()) {
                list.add(str);
            }
        }
        return list;
    }

    /**
     * The following three methods take a String formatted as 
     *      source->destination:time
     * and parse out each of these three components.
     */
    private String getSource(String flightStr) {
        return flightStr.split("->")[0];
    }

    private String getDestination(String flightStr) {
        String arrivalPart = flightStr.split("->")[1];
        return arrivalPart.split(":")[0];
    }

    private double getTime(String flightStr) {
        String arrivalPart = flightStr.split("->")[1];
        return Double.parseDouble(arrivalPart.split(":")[1]);
    }

    /*
     * Converts a time in hours to a formatted String of 
     * x + "h" + y + "m" where x and y represent the hours
     * and minutes respectively. 
     */
    private String getDateString(double time) {
        int hours = (int)time;
        int minutes = (int)(60 * (time - Math.floor(time)));
        String minuteString = "" + minutes;
        //Pad the minutes to be exactly two digits
        while (minuteString.length() < 2) {
            minuteString = "0" + minuteString;
        }
        return hours + "h" + minuteString + "m";
    }

    private boolean hasDestination(ArrayList<String> destinations, String target) {
        return findDestination(destinations, target) != null;
    }

    private String findDestination(ArrayList<String> destinations, String target) {
        for (String dest : destinations) {
            if (getDestination(dest).equals(target)) {
                return dest;
            }
        }
        return null;
    }
}
