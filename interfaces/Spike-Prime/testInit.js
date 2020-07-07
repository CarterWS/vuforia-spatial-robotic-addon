var serial = require('./serial.js');

var ports = ["","","","","",""]

function read() {
    data = serial.getSensor()
    if (data != "Nothing") {
        console.log(data)
        if (data.includes('[')) {
            data = data.substring(1, data.length - 2)
            data = data.replace(/'/g, '')
            data = data.replace(/ /g, '')
            data = data.split(',')
            for (i = 0; i < data.length; i++) {
                ports[i] = data[i]
            }
            console.log(ports)
        }
    }
    if (parseInt(data) <= 1) {
        console.log("smol")
    }
    setTimeout(() => { read(); }, 0);
}

serial.openPort()
setTimeout(() => { serial.sendFile('initialize.py'); }, 5000);
read()

setTimeout(() => { serial.writePort('while True:\r\n'); }, 10000);
//setTimeout(() => { serial.writePort('\tprint(D.get_color())\r\n'); }, 10000);
setTimeout(() => { serial.writePort('\tprint(F.get_force_percentage()/100)\r\n\r\n\r\n\r\n'); }, 10000);


setTimeout(() => { serial.writePort('\x03'); }, 13000);

setTimeout(() => { serial.writePort('print(B.get_distance_cm())\r\n\r\n\r\n\r\n'); }, 15000);



//setTimeout(() => { serial.writePort('A.stop()\r\n'); }, 11000);