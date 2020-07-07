var zerorpc = require("zerorpc");

var msg = "ultra.distance_inches"

var server = new zerorpc.Server({
    message: function(reply) {
        reply(null, msg)
    },
    response: function(message, reply) {
        console.log(message)
        if (message == 'quit'){
            process.abort()
        }
        reply(null, "done")
    },
    
});

function tester(){
    msg = "ignore"
}

//setTimeout(tester, 25000);

server.bind("tcp://0.0.0.0:4243");