
public class AirplaneSoln {

	private String flightCode;
	private boolean airborne;
	private String origin;
	private String destination;


	public AirplaneSoln(String flightCode, String origin, String destination) {
		makePlane();
		this.flightCode = flightCode;
		this.origin = origin;
		this.destination = destination;
		this.airborne = false;
	}

	private void makePlane() {
		System.out.println("Making plane!");
	}

	public void takeOff() {
		if (this.airborne) {
			System.out.println("Airplane log: I'm already on my way to " + this.destination + " from " + this.origin + "!");
		} else if (this.origin.equals("")) {
			System.out.println("Airplane log: I don't know where I am!");
		} else if (this.destination.equals("")) {
			System.out.println("Airplane log: I don't know where I need to go!");
		} else if (this.flightCode.equals("")) {
			System.out.println("Airplane log: I need a flight code to travel!");
		} else {
			System.out.println("Airplane log: Taking off to " + this.destination + " from " + this.origin + "!");
			this.airborne = true;
		}
	}


	public void touchDown() {
		if (!this.airborne) {
			System.out.println("Already touched down!");
		} else {
			System.out.println("Airplane log: landing in " + this.destination + "!");
			this.airborne = false;
			this.origin = this.destination;
			this.destination = "";
		}
	}


	public String getFlightCode() {
		return flightCode;
	}

	public void setFlightCode(String flightCode) {
		System.out.println("Airplane log: changing flight code!!");
		this.flightCode = flightCode;
	}

	public boolean isAirborne() {
		return airborne;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		System.out.println("Airplane log: changing destination!");
		this.destination = destination;
	}

	public String toString() {
		String result = this.flightCode;
		if (this.airborne) {
			result += ", flying from " + this.origin + " to " + this.destination;
		}
		return result;
	}

}
