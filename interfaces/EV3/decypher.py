#!/usr/bin/env pybricks-micropython
'''from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (Motor, TouchSensor, ColorSensor,
                                InfraredSensor, UltrasonicSensor, GyroSensor)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile
import ubinascii, ujson, urequests, utime'''

#!/usr/bin/env python3
from ev3dev2.motor import LargeMotor, OUTPUT_A, OUTPUT_B, OUTPUT_C, OUTPUT_D, SpeedPercent, MoveTank
from ev3dev2.sensor import INPUT_1, INPUT_2, INPUT_3, INPUT_4
from ev3dev2.sensor.lego import TouchSensor, ColorSensor, GyroSensor, UltrasonicSensor
from ev3dev2.led import Leds
import time

# Decrypts the messages being sent over bluetooth
def decrypt(msg):
    msgList = msg.split()
    try:
        portLetter = msgList[0].upper()
        portCommand = msgList[1].lower()
    except:
        return 'Please enter the port number/letter and either the' \
         +' speed for the motor or the type of sensor separated by a space'

    if (portLetter in ('A', 'B', 'C', 'D')):
        if (portLetter == 'A'):
            Runner = LargeMotor(OUTPUT_A)
        elif (portLetter == 'B'):
            Runner = LargeMotor(OUTPUT_B)
        elif (portLetter == 'C'):
            Runner = LargeMotor(OUTPUT_C)
        elif (portLetter == 'D'):
            Runner = LargeMotor(OUTPUT_D)
        try:
            Runner.on_for_rotations(int(portCommand), 1, brake = False, block = False)
            time.sleep(1)
            return 'motor'
        except:
            return 'Please enter a valid speed.'
    
    elif (portLetter in ('1', '2', '3', '4')):
        if (portCommand == 'touch'):
            Button = TouchSensor()
            return Button.is_pressed
        elif (portCommand == 'ultra'):
            Eyes = UltrasonicSensor()
            return Eyes.distance_centimeters
        elif (portCommand == 'color'):
            Colors = ColorSensor()
            return Colors.color
        elif (portCommand == 'gyro'):
            Tilter = GyroSensor()
            return Tilter.angle

    return 'I don\'t recognize that command. Please enter another.'

#value = decrypt("A 100")

#print(value)