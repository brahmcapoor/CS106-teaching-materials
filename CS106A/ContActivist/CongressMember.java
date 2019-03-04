/**
 * This class represents a single representative or senator
 * in Congress, and contains information about them including:
 * name, phone number, and optionally an email address.
 */
public class CongressMember {

	// TODO: What instance variables do we need?

	// name, phone number, email, state
	private String name;
	private String phoneNumber;
	private String email;
	private String state;

	public CongressMember(String name, String phoneNumber, String email, String state) {
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.state = state;
	}

	public String getDescription(String param) {
		String description = this.name + " ";
		if (param.equals("phone")) {
			description += this.phoneNumber;
		} else if (param.equals("email")) {
			if (this.email == null) {
				description += "No email provided";
			} else {
				description += this.email;
			}
		}
		return description;
	}

}
