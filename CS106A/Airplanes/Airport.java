import acm.program.*;
import java.util.HashMap;

public class Airport extends ConsoleProgram {
	
	
	public void run() {
		
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
	
	/**
	 * Decomission a plane
	 */
	private void deletePlane() {
		String flightCode = readLine("Flight Code? ");
	}

	/**
	 * Update a plane's flight code or destination city
	 */
	private void changePlaneInfo() {
		String flightCode = readLine("Flight Code? ");
	}
	
	/**
	 * Get the information of a particular plane by asking the user
	 * for the plane's flight code
	 */
	private void getPlaneInfo() {
		String flightCode = readLine("Flight Code? ");
	}

	/**
	 * Make a plane land if it's currently airborne.
	 */
	private void landFlight() {
		String flightCode = readLine("Flight Code? ");
	}

	/**
	 * Make a plane take off if it's currently grounded
	 */
	private void makeFlight() {
		String flightCode = readLine("Flight Code? ");
	}

	/**
	 * List all the planes currently on the ground or in the air
	 */
	private void listAllFlights() {
		
	}

	/**
	 * STARTER CODE: Gets a command from the user
	 * @return the user's command as a characters
	 */
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
