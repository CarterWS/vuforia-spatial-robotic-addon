var serial = require('./serial.js');

var data = 'None'
var colors = ["black", "violet", "blue", "cyan", "green", "yellow", "red", "white"]

function read() {
    data = serial.getSensor()
    //console.log(isNaN(data))
    //console.log(data.toString().length)
    console.log(data)
    arr = data.split(',')
    arrSize = arr.length
    if(arrSize > 1) {
        console.log("array")
    }
    if ((!isNaN(data) || colors.includes(data)) && data.toString().length > 0) {
        console.log("data")
    }
    setTimeout(() => { read(); }, 0);
}

serial.openPort()
setTimeout(() => { serial.sendFile('initialize.py'); }, 5000);
read()