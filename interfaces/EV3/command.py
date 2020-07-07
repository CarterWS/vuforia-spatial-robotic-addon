#!/usr/bin/env python
# -*- coding: utf-8 -*-

import readline
import code
import ports

vars = globals().copy()
vars.update(locals())
shell = code.InteractiveConsole(vars)
shell.push("print(\"Hello\")")
shell.push("print(\"Hello\")")
shell.push("print(\"Hello\")")
shell.push("ports.A.on_for_rotations(20, 1, brake = False, block = False)")
shell.push("print(\"Hello\")")