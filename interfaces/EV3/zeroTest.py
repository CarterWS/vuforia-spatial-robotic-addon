import zerorpc
import bluetooth

class HelloRPC(object):
    def hello(self, name):
        return "Hello, " #% name

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()