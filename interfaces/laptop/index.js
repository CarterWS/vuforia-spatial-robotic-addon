//Carter Silvey

var server = require('@libraries/hardwareInterfaces');
var settings = server.loadHardwareInterface(__dirname);
var player = require('play-sound')(opts = {});
var noble = require('@abandonware/noble');

var song = 'hands.mp3' // Change this to your mp3 file

var audio = player.play(song, function(err){
  if (err && !err.killed) throw err
})
audio.kill()

exports.enabled = settings('enabled');
exports.configurable = true;

if (exports.enabled){
    
    // Code executed when your robotic addon is enabled
    setup();

    console.log("Laptop is connected");

    function setup() {
    	exports.settings = {
    		objectName: {
    			value: settings('objectName'),
    			type: 'text',
    			default: 'playButton',
    			disabled: false,
    			helpText: 'The name of the object that connects to this hardware interface.'
    		}
    	};
    }

    objectName = exports.settings.objectName.value;

    server.addEventListener('reset', function () {
    	settings = server.loadHardwareInterface(__dirname);
    	setup();

    	console.log('Laptop: Settings loaded: ', objectName);
	});
}

function startHardwareInterface() {
	console.log('Laptop: Starting up')

	server.enableDeveloperUI(true)
	server.addNode(objectName, "music", "button", "node");

	server.addReadListener(objectName, "music", "button", function(data){
		if(data.value == 1){
			playMusic()
		}
		if(data.value == 0){
			stopMusic()
		}	
	});

	updateEvery(0, 100);
}

function playMusic() {
	audio = player.play(song, function(err){
		if (err && !err.killed) throw err
	})
}

function stopMusic() {
	audio.kill()
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