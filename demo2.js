var dgram = require('dgram');

var client = dgram.createSocket('udp4');

var message = new Buffer('Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber Kyber ');
var async = require('async')
var fs = require('fs'),
PNG = require('node-pngjs').PNG;
var host = "127.0.0.1";

var buf = []

var sleep = require('sleep');


if (process.argv[2]) {
  host = process.argv[2];
}

console.log(host);

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function loadImage(name, s, invert, cb) {

  fs.createReadStream(name)
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
      var buf = [];
      for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
              var idx = (this.width * y + x) << 2;
              if (!invert) {
                if (this.data[idx] < 250) {
                  for (var i = 1; i < s + 1; i++) {
                    buf.push("" + (1 + y*2+i*1.5) + "," + (1 + x * 50 + i))
                  }
                }
              } else {
                if (this.data[idx] > 10) {
                  for (var i = 1; i < s + 1; i++) {
                    buf.push("" + (1 + y*2+i*1.5) + "," + (1 + x * 50 + i))
                  }
                }
              }

          }
      }

      buf = buf.getUnique()

     	for (var i = 0; i < buf.length; i++) {
     		a = buf[i].split(",")
     		buf[i] = [parseInt(a[0]), parseInt(a[1])]
     	}

      cb(buf);
  }
  );
}

function drawPixel(x, y) {
  y = 1500 - y;
  if (y > 1500) {
    y = 1500;
  }
  if (y < 0) {
    y = 0;
  }
  if (x > 65000) {
    x = 65000;
  }
  client.send(message, 0, y, x, host, function(){});
  console.log("drawpixel", x,y)
}

function draw(name, x, y, cb) {
      var buf = images[name];
      buf = shuffle(buf);
      console.log("Drawing", name, "pixels:", buf.length)
      for (var i = 0; i < buf.length; i++) {
        var Y = 1500 - buf[i][0] - y;
        if (Y > 1500) {
          Y = 1500;
        }
        if (Y < 0) {
          Y = 0;
        }
        client.send(message, 0, Y, buf[i][1] + x, host, function(err, bytes) {});
      }

      //t = Math.floor(buf.length / 10)
      t = 1000;
      setTimeout(function() {
        console.log("Drawing", name, "done", t);
        if (cb) {
          cb();
        }
      }, t)
}

var images = [];

console.log("Precalculating...")
async.series([
  function preload1(cb) {
    loadImage("duck2.png", 2, false, function(buf) {
      images["duck2"] = buf;
      cb();
    })
  },  function preload1(cb) {
    loadImage("hello.png", 2, true, function(buf) {
      images["hello"] = buf;
      cb();
    })
  },  function preload1(cb) {
    loadImage("netcrew.png", 2, true, function(buf) {
      images["netcrew"] = buf;
      cb();
    })
  },function preload1(cb) {
    loadImage("presents.png", 2, true, function(buf) {
      images["presents"] = buf;
      cb();
    })
  },
 function preload1(cb) {
    loadImage("ball.png", 1, true, function(buf) {
      images["ball"] = buf;
      cb();
    })
  },
 function preload1(cb) {
    loadImage("pony.png", 2, true, function(buf) {
      images["pony"] = buf;
      cb();
    })
  },
  function preload1(cb) {
    loadImage("kitty.png", 2, false, function(buf) {
      images["kitty"] = buf;
      cb();
    })
  },

  function draw1(cb) {
    console.log("Starting!")
    draw("hello", 20000, 1)
    draw("hello", 20000, 1, cb)
  },
  function draw1(cb) {
    draw("netcrew", 20000, 500)
    draw("netcrew", 20000, 500, cb)
  },    function draw1(cb) {
    draw("presents", 20000, 100)
    draw("presents", 20000, 100)
    draw("presents", 20000, 1000)
    draw("presents", 20000, 1000, cb)
  },
  function draw2(cb) {
    draw("duck2", 0, 10, cb)
  },  
  function (cb) {
    draw("kitty", 10, 10)
    draw("kitty", 10, 10, cb)
  },  function (cb) {
    setTimeout(cb, 500);
  },

  function draw2(cb) {
    draw("pony", 30000, 10)
    draw("pony", 30000, 10, cb)
  },

  function draw2(cb) {
    draw("duck2", 1000, 100, cb)
  },
  function draw2(cb) {
    draw("duck2", 10000, 200, cb)
  }    




  ])




