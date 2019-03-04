import acm.program.*;
import java.util.*;
import java.io.*;

/**
 * This server reads in data about all members of congress,
 * and can respond to "getCongressEmailsForState" and
 * "getCongressPhonesForState" requests.  Both request types
 * should include a "stateCode" parameter. Both send back a string
 * containing a list of all that state's congress members, and their
 * requested information (phone or email).  Note that not all members
 * are guaranteed to have an email address. 
 */
public class ContActivistServer extends ConsoleProgram 
	implements SimpleServerListener {
	
	
	/* CONSTANTS */
	private static final int PORT = 8000; // The internet port that requests are made over
	private static final String DATA_FILENAME = "congress.txt"; // the data filename
	
	
	/* INSTANCE VARIABLES */
	private SimpleServer server;

	private HashMap<String, ArrayList<CongressMember>> congress 
		= new HashMap<String, ArrayList<CongressMember>>();
	
	public void run() {
		readCongressFile(DATA_FILENAME);
		
		println("Starting server on port " + PORT);
		server = new SimpleServer(this, PORT);
		server.start();
	}
	
	private void readCongressFile(String filename) {

		try {
			Scanner scanner = new Scanner(new File(filename));			
			
			while (scanner.hasNextLine()) {
				String name = scanner.nextLine();
				String stateCode = scanner.nextLine();
				String phoneNumber = scanner.nextLine();
				String emailLink = scanner.nextLine();
				if (emailLink.equals("")) {
					emailLink = null;
				}
				
				CongressMember member = new CongressMember(name, phoneNumber, emailLink, stateCode);
				if (!congress.containsKey(stateCode)) {
					congress.put(stateCode, new ArrayList<CongressMember>());
				} 
				congress.get(stateCode).add(member);
				scanner.nextLine();
			}	
			scanner.close();
		} catch (IOException e) {
			println("bruh: " + e);
		}
	}

	public String requestMade(Request request) {
		String cmd = request.getCommand();
		println("Request received: " + request); //request.toString() is automatically called
		
		String response = "";
		
		if (cmd.equals("getCongressPhonesForState")) {
			response = congressPhones(request);
		} else if (cmd.equals("getCongressEmailsForState")) {
			response = congressEmails(request);
		} else {
			response = "Error: Unknown command " + cmd + ".";
		}
		return response;
	}
	
	private String congressPhones(Request req) {
		String response = "";
		String stateCode = req.getParam("stateCode");
		ArrayList<CongressMember> mems = congress.get(stateCode);
		for (CongressMember mem: mems) {
			String desc = mem.getDescription("phone");
			response += desc + "\n";
		}
		return response;
	}
	
	private String congressEmails(Request req) {
		String response = "";
		String stateCode = req.getParam("stateCode");
		ArrayList<CongressMember> mems = congress.get(stateCode);
		for (CongressMember mem: mems) {
			String desc = mem.getDescription("email");
			response += desc + "\n";
		}
		return response;
	}
}

