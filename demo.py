import socket
from time import sleep
from random import randint, shuffle
import png
import math

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
UDP_IP = "87.92.12.142"

MESSAGE = "Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber"

images = {}

def readImage(filename, s, invert):
    a = png.Reader(filename=filename)
    w, h, pixels, metadata = a.read_flat()
    print(metadata)
    buf = []
    print("Read image %s w:%d h:%d, pixels: %d" % (filename, w, h, len(pixels)))
    for y in xrange(0, h):
        for x in xrange(0, w):
            if metadata['greyscale']:
                idx = (w * y + x)
            elif metadata['alpha'] == False:
                idx = (w * y + x) * 3 - 1
            else:
                idx = (w * y + x) * 4 - 1
            try:
                if invert == False:
                    if pixels[idx] < 250:
                        for i in xrange(1, s + 1):
                            buf.append((int(1+y*2+i*1.5),int(1+x*50+i)))
                else:
                    if pixels[idx] > 10:
                        for i in xrange(1, s + 1):
                            buf.append((int(1+y*2+i*1.5),int(1+x*50+i)))
            except IndexError as e:
                print("ERRR: %d" % idx)
                raise e
    buf = list(set(buf))
    images[filename] = buf

readImage("duck2.png", 2, True)
readImage("hello.png", 2, True)
readImage("netcrew.png", 2, True)
readImage("presents.png", 2, True)
readImage("ball.png", 2, True)
readImage("pony.png", 2, True)
readImage("kitty.png", 2, False)

def drawImage(name, x, y):
    shuffle(images[name])
    buf = images[name]
    print("Drawing %s at %d,%d" % (name, x, y))
    for i in buf:
        X = int(i[1]) + x
        Y = int(i[0]) + y
        Y = 1500 - Y
        if Y > 1500:
            Y = 1500
        if Y <= 0:
            Y = 1
        if X > 65000:
            X = 65000
        if X <= 1:
            X = 1
        if randint(0, 4) == 0:
            sock.sendto(MESSAGE[0:Y], (UDP_IP, X))

def putpixel(x, y):
    x = int(x)
    y = int(y)
    y = 1500 - y
    if y > 1500:
        y = 1500
    if y <= 0:
        y = 1
    if x > 65000:
        x = 65000
    if x <= 1:
        x = 1
    sock.sendto(MESSAGE[0:y], (UDP_IP, x))

RADIUS = 1000
RINGS = 20
HALFX = 30000
HALFY = 750
RAD2DEG = ((4 * math.atan(1)) / 180.0)
STEP_SIZE = 8
XRES = 65000
YRES = 1500

Add = 0
PX = [0] * 360
PY = [0] * 360
Move = 0
def precalcring():
    c = 0
    RaddY = RADIUS + 300 * math.sin((Add * 4) * RAD2DEG)
    RaddY2 = RADIUS + 300 * math.cos((Add * 3) * RAD2DEG) 
    for l in xrange(0, 360, 8):
        Xx = (RaddY * math.sin((l + (Add * 2)) * RAD2DEG))
        Yy = (RaddY2 * math.cos((l + (Add * 2)) * RAD2DEG))
        PX[c] = Xx
        PY[c] = Yy
        c = c + 1

def drawPixelTunnel(Move):
    Depth = 20
    DAdd = 0
    xsine = 0.0
    ysine = 0.0
    RINGS = 8
    DAdd = Depth / RINGS
    Depth = Depth + Move
    #Additive = int(Clickm)
    Additive = 4

#    if Move <= 0:
#        Move = Move + DAdd * 2.0
#        Clickm = Clickm - DAdd * 59

    for o in xrange(0, RINGS):
        c = 0
        tc = (o + 1) * 7
        xsine = 260 * math.sin(Additive * RAD2DEG)
        ysine = 260 * math.cos(Additive * RAD2DEG)
        for l in xrange(0, 360, STEP_SIZE):
            X = int((PX[c] + xsine) / Depth) + HALFX
            Y = int((PY[c] + ysine) / Depth) + HALFY
            if ((X > 0) and (X < XRES) and (Y > 0) and (Y < YRES)):
                putpixel(X, Y)
            c = c + 1

        Additive = Additive + 15
        Depth = Depth - DAdd


for j in xrange(0, 100):
    precalcring()
    drawPixelTunnel(j)
    Tick = 0.6 / 10.0
    Add = Add + 0.6

if False:
    drawImage("netcrew.png", 20000, 400)
    sleep(1)
    drawImage("presents.png", 20000, 500)
    sleep(0.3)
    drawImage("presents.png", 20000, 600)
    sleep(0.3)
    drawImage("presents.png", 20000, 700)
    sleep(0.3)
    drawImage("presents.png", 20000, 800)
    sleep(0.3)


    for i in xrange(1, 7):
        drawImage("duck2.png", 10 + 2200*i, 40)

    # sade
    for n in xrange(100):
        x_offset = randint(1, 65000) + 100
        y_offset = randint(1, 50) + 1
        direction = randint(0, 1) - 1
        if direction == 0:
            direction = 1
        for x in xrange(1500):
            putpixel(x * direction+ x_offset, x + y_offset)
        sleep(0.1)

