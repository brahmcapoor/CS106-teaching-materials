import acm.program.*;
import java.util.HashMap;

public class AirportSoln extends ConsoleProgram {
	
	private HashMap<String, AirplaneSoln> planes;
	
	public void run() {
		planes = new HashMap<String, AirplaneSoln>();
		
		while (true) {
			char command = getCommand();
			if (command == 'q') {
				break;
			} else if (command == 'l') {
				listAllFlights();
			} else if (command == 'm') {
				makeFlight();
			} else if (command == 't') {
				landFlight();
			} else if (command == 'g') {
				getPlaneInfo();
			} else if (command == 'c') {
				changePlaneInfo();
			} else if (command == 'd') {
				deletePlane();
			}
			println(" ");
		}
	}

	private void deletePlane() {
		String flightCode = readLine("Flight code? ");
		if (!planes.containsKey(flightCode)) {
			println("Flight doesn't exist!");
		} else {
			AirplaneSoln plane = planes.get(flightCode);
			if (plane.isAirborne()) {
				println("Plane is in flight, can't delete!");
			} else {
				planes.remove(flightCode);
			}
		}
		
	}

	private void changePlaneInfo() {
		String flightCode = readLine("Flight code? ");
		if (!planes.containsKey(flightCode)) {
			println("Flight doesn't exist!");
		} else {
			String newFlightCode = readLine("New FlightCode? ");
			String newDestination = readLine("New Destination?");
			
			AirplaneSoln plane = planes.get(flightCode);
			planes.remove(flightCode);
			
			plane.setFlightCode(newFlightCode);
			plane.setDestination(newDestination);
			planes.put(newFlightCode, plane);
		}
		
	}

	private void getPlaneInfo() {
		String flightCode = readLine("Flight code? ");
		if (!planes.containsKey(flightCode)) {
			println("Flight doesn't exist!");
		} else {
			println(planes.get(flightCode));
		}	
	}

	private void landFlight() {
		String flightCode = readLine("Flight code? ");
		if (!planes.containsKey(flightCode)) {
			println("Flight doesn't exist!");
		} else {
			planes.get(flightCode).touchDown();
		}
	}

	private void makeFlight() {
		String flightCode = readLine("Flight code? ");
		if (planes.containsKey(flightCode)) {
			println("flight already exists!");
		} else {
			String origin = readLine("Origin city? ");
			String destination = readLine("Destination? ");
			AirplaneSoln plane = new AirplaneSoln(flightCode, origin, destination);
			plane.takeOff();
			planes.put(flightCode, plane);
		}
		
	}

	private void listAllFlights() {
		for (String flightCode: planes.keySet()) {
			println(planes.get(flightCode));
		}
		
	}

	private char getCommand() {
		while (true) {
			String command = readLine("Quit, List, Make, Touchdown, Get Info, Change Info, Delete? ").toLowerCase();
			if (command.length() != 1 || "qlmtgcd".indexOf(command.charAt(0)) == -1) {
				println("Invalid command");
			} else {
				return command.charAt(0);
			}
		}
	}

}
