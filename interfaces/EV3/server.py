"""
A simple Python script to receive messages from a client over
Bluetooth using PyBluez (with Python 3.7).
"""

import code
#import subprocess
import bluetooth
import os
import time
from ports import *

hostMACAddress = '' #leave empty
port = 3
backlog = 1
size = 1024
s = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
s.bind((hostMACAddress, port))
s.listen(backlog)

vars = globals().copy()
vars.update(locals())
shell = code.InteractiveConsole(vars)

print("up and running")

def fileWrite(msg):
    shell.push("import sys")
    shell.push("stdoutOrigin = sys.stdout")
    shell.push("sys.stdout = open(\"log.txt\", \"w\")")
    shell.push(msg)
    shell.push("sys.stdout.close()")
    shell.push("sys.stdout=stdoutOrigin")

try:
    client, clientInfo = s.accept()
    while 1:
        data = client.recv(size)
        if data:
            msg = data.decode()
            if msg != "ignore":
                #print(msg)
                fileWrite(msg)
                try:
                    f = open("log.txt", 'r')
                    line = f.readline().rstrip()
                    if (os.parth.getsize("log.txt") == 0):
                        client.send("ignore")
                    else:
                        client.send(line)
                    f.close()
                    #print(line)
                    client.send(line) # Echo back to client
                except:
                    client.send("ignore")
            else:
                client.send("ignore")      

except:    
    print("Closing socket")
    client.close()
    s.close()