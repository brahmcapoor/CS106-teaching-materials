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
	private HashMap<String, ArrayList<CongressMember>> congress;  

	public void run() {
		congress = new HashMap<String, ArrayList<CongressMember>>();
		readCongressFile(DATA_FILENAME);
		
		println("Starting server on port " + PORT);
		server = new SimpleServer(this, PORT);
		server.start();
	}
	
	private void readCongressFile(String filename) {

		try {
			Scanner scanner = new Scanner(new File(filename));			
			
			while (scanner.hasNextLine()) {
				
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
			
		} else if (cmd.equals("getCongressEmailsForState")) {
			
		} else {
			response = "Error: Unknown command " + cmd + ".";
		}
		return response;
	}
}

