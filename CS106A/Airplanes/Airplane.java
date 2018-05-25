
public class Airplane {
	
	/**
	 * The constructor for the Airplane class
	 * @param flightCode
	 * @param origin
	 * @param destination
	 */
	public Airplane(String flightCode, String origin, String destination) {
		makePlane();
		
	}

	/**
	 * If only making planes was this simple in real life!
	 */
	private void makePlane() {
		System.out.println("Making plane!");
	}

	/**
	 * Check that the plane has a valid origin and destination as well as a flight code. 
	 * If so, update instance variables to reflect that the plane has taken off and is 
	 * en route.
	 */
	public void takeOff() {
		
	}

	/**
	 * Check that the plane is airborne. If so, land the plane.
	 */
	public void touchDown() {
		
	}
	
	/**
	 * @return whether or not the plane is currently airborne
	 */
	public boolean isAirborne() {
		return false;
	}


	public String toString() {
		return "";
	}

}
