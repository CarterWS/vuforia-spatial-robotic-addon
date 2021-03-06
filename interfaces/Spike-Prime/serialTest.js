//Carter Silvey

// Constants
const SerialPort = require('serialport')
const parsers = SerialPort.parsers
const reader = require('readline')
const syncReader = require('readline-sync')
const fs = require("fs");

// Variables
var name = "test.py"
var tabs = 0
var backspaces = '\b'

// Use a `\r\n` as a line terminator
const parser = new parsers.Readline({
	delimiter: '\r\n',
})

// The port to connect to (in this case it's a bluetooth serial connection)
const port = new SerialPort('/dev/tty.LEGOHub40BD3248762A-Ser', {
	baudRate: 115200,
})

port.pipe(parser)

// Connected to the serial port
function openPort() {
	port.on('open', () => console.log('Port open'))
	// Use the below line to see what the repl outputs
	//parser.on('data', printOut)	
}

function printOut(msg) {
	console.log(msg)
}

// Write a message to the connected device
function writePort(msg) {
	port.write(msg)
}

// Get the name of the file that is to be sent over the serial port
function getFileName() {
	name = syncReader.question('What file would you like to send?', {
		});
	console.log('Sending the file');
	readFile(name)
}

// Read in the file line by line and send each line
async function readFile(name) {
	// File reading constants
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.
	const fileStream = fs.createReadStream(name);

	const rl = reader.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	// Each line in input.txt will be successively available here as `line`.
	for await (const line of rl) {
		
		//console.log(`Line from file: ${line}`);

		// Send a line terminator to make sure we are on a fresh line
		writePort('\r\n')

		// Compare the tab spacing to the last lines tab spacing
		lastTabs = tabs

		// Find out how many indents the current line is on
		if (line[0] != ' '){
			tabs = 0
		}
		else if (line[0] == ' ' && line[4] != ' '){
			tabs = 1
		}
		else if (line[0] == ' ' && line[4] == ' ' && line[8] != ' '){
			tabs = 2
		}
		else{
			tabs = 3
		}
		//console.log(tabs)

		// If we have unindented, then make sure the repl knows
		if (tabs < lastTabs){
			// If we are back at the bottom, send multiple fresh lines to execute the previous lines
			if (tabs == 0){
				setTimeout(() => { writePort('\r\n\r\n\r\n'); }, 1000);
			}
			// Otherwise just send the amount of backspaces as tabs we unindented
			else{
			backspaces = '\b'.repeat(lastTabs-tabs)
			setTimeout(() => { writePort(backspaces); }, 1000);
			}
		}

	//Send the line that we read from the file while trimming off the excess spaces/tabs and adding a delimiter
	setTimeout(() => { writePort(line.trim().concat('\r\n')); }, 1000);
	}
	writePort('\r\n\r\n\r\n\r\n');
}

// Open the port
openPort();

// Get the file name, which in turn reads and sends the file
setTimeout(() => { getFileName(); }, 6000);