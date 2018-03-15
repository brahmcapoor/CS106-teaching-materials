/**
 * This class represents a single representative or senator
 * in Congress, and contains information about them including:
 * name, phone number, and optionally an email address.
 */
public class CongressMemberSolution {
	
	private String name;
	private String phoneNumber;
	private String emailLink;
	
	public CongressMemberSolution(String name, String phoneNumber, String emailLink) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.emailLink = emailLink;
	}
	
	public String getDescription(boolean phone) {
        String description = this.name + " ";
        if (phone) {
            description += this.phoneNumber;
        } else {
            if (this.emailLink != null) {
                description += this.emailLink;
            } else {
                description += "No email";
            }
        }
        return description;
    }
}
