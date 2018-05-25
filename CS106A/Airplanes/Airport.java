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

	private void deletePlane() {
		String flightCode = readLine("Flight Code? ");
	}

	private void changePlaneInfo() {
		String flightCode = readLine("Flight Code? ");
	}

	private void getPlaneInfo() {
		String flightCode = readLine("Flight Code? ");
	}

	private void landFlight() {
		String flightCode = readLine("Flight Code? ");
	}

	private void makeFlight() {
		String flightCode = readLine("Flight Code? ");
	}

	private void listAllFlights() {
		
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
