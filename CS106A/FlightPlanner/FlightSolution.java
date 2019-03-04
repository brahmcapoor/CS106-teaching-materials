/*
 * File: FlightSolution.java
 * A fully implemented Flight class.
 */
public class FlightSolution {
	private String source;
	private String destination;
	private double duration;
	
	public FlightSolution(String src, String dest, double dur) {
		this.source = src;
		this.destination = dest;
		this.duration = dur;
	}
	
	public String getSource() {
		return this.source;
	}
	
	public String getDestination() {
		return this.destination;
	}
	
	public double getDuration() {
		return this.duration;
	}
	
	public String toString() {
		return this.source + "->" + this.destination + ":" + this.duration;
	}
}
