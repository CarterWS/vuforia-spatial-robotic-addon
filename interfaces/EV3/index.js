//Carter Silvey 
//Alina Shah
//EV3 Vuforia

// Variables
var zerorpc = require("zerorpc");
var server = require('@libraries/hardwareInterfaces');
var settings = server.loadHardwareInterface(__dirname);
var noble = require('@abandonware/noble');

var msg = "ignore"

// ZeroRPC client with client.py file
var zeroServer = new zerorpc.Server({
    message: function(reply) {
        reply(null, msg)
    },
    response: function(message, reply) {
        if (message != "ignore"){
            console.log(message)
        }
        reply(null, "done")
    }
});

zeroServer.bind("tcp://0.0.0.0:4243");

exports.enabled = settings('enabled');
exports.configurable = true;

if (exports.enabled){
    
    // Code executed when your robotic addon is enabled
    setup();

    console.log("EV3 is connected");

    function setup() {
    	exports.settings = {
    		objectName: {
    			value: settings('objectName'),
    			type: 'text',
    			default: 'moveButton',
    			disabled: false,
    			helpText: 'The name of the object that connects to this hardware interface.'
    		}
    	};
    }

    objectName = exports.settings.objectName.value;

    server.addEventListener('reset', function () {
    	settings = server.loadHardwareInterface(__dirname);
    	setup();

    	console.log('EV3: Settings loaded: ', objectName);
	});
}

// Starts the interface with the hardware
function startHardwareInterface() {
	console.log('EV3: Starting up')

	server.enableDeveloperUI(true)

    // Adds a button node to the object on the app
	server.addNode(objectName, "motor", "button", "node");

    // Listens for the button node
	server.addReadListener(objectName, "motor", "button", function(data){
		// When true, change the message to desired command
        if(data.value == 1){
            console.log('on')
			msg = "ultra.distance_centimeters"
		}
        // When false, change the message to ignore
		if(data.value == 0){
            console.log('off')
            msg = "ignore"
		}	
	});

	updateEvery(0, 100);
}

function updateEvery(i, time){
	setTimeout(() => {
		updateEvery(++i, time);
	}, time)
}

server.addEventListener("initialize", function () {
    if (exports.enabled) startHardwareInterface();
});

server.addEventListener("shutdown", function () {
});