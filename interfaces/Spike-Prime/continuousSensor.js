var serial = require('./serial.js');

serial.writePort("while True:\r\n");
    if (colorSensor != "none") {
        serial.writePort("\tprint(" + colorSensor + ".get_color())\r\n")
    }
    if (distanceSensor != "none") {
        serial.writePort("\tprint(" + distanceSensor + ".get_distance_cm())\r\n")
    }
    if (forceSensor != "none") {
        serial.writePort("\tprint(" + forceSensor + ".get_force_percentage()/100)\r\n")
        serial.writePort("\tutime.sleep_ms(2)\r\n")
    }
    serial.writePort("\tprint(hub.motion.accelerometer())\r\n\r\n\r\n\r\n")