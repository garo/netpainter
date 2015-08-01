var dgram = require('dgram');

var client = dgram.createSocket('udp4');

var message = new Buffer('MMy KungFu iKungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu iKungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!y KungFu iKungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!My KungFu is Good!');

var fs = require('fs'),
PNG = require('node-pngjs').PNG;
  var host = "185.11.209.162";

var buf = []

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


fs.createReadStream('kitty.png')
  .pipe(new PNG({
      filterType: 4
  }))
  .on('parsed', function() {

    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            if (this.data[idx] < 255) {
            	for (var i = 1; i < 5; i++) {
            		buf.push("" + (1 + y*2+i*1.5) + "," + (1 + x * 50 + i))
            	}
            }

        }
    }

    buf = buf.getUnique()

   	for (var i = 0; i < buf.length; i++) {
   		a = buf[i].split(",")
   		buf[i] = [parseInt(a[0]), parseInt(a[1])]
   	}

    (function next(j, ox, oy) {
    	console.log("loop", j, "buf length: ", buf.length);
			buf = shuffle(buf);

	 	for (var i = 0; i < buf.length; i++) {
			client.send(message, 0, oy - buf[i][0], ox + buf[i][1], host, function(err, bytes) {});
		}
		setTimeout(function() {
			if (ox > 40000) {
				ox = 1200;
			}
			//ox += 1000;

			next(j+1, ox, oy);
		}, 200);   	
    })(1, 3000, 1200);

});
