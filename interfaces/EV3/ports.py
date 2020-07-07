from ev3dev2.motor import LargeMotor, OUTPUT_A, OUTPUT_B, OUTPUT_C, OUTPUT_D, SpeedPercent, MoveTank
from ev3dev2.sensor import INPUT_1, INPUT_2, INPUT_3, INPUT_4
from ev3dev2.sensor.lego import TouchSensor, ColorSensor, GyroSensor, UltrasonicSensor
from ev3dev2.led import Leds
import time

leds = Leds()

try:
    A = LargeMotor(OUTPUT_A)
except:
    pass
try:
    B = LargeMotor(OUTPUT_B)
except:
    pass
try:
    C = LargeMotor(OUTPUT_C)
except:
    pass
try:
    D = LargeMotor(OUTPUT_D)
except:
    pass
try:
    ultra = UltrasonicSensor()
except:
    pass
try:
    touch = TouchSensor()
except:
    pass
try:
    color = ColorSensor()
except:
    pass
try:
    gyro = GyroSensor()
except:
    pass