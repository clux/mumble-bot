#!/usr/bin/env node
var mumble = require('mumble');
var lame = require('lame');
var fs = require('fs');

var dropSound = function (client, sound) {
  var decoder = new lame.Decoder();

  var stream;
  decoder.on('format', function (format) {
    stream.pipe(client.inputStream({
      channels: format.channels,
      sampleRate: format.sampleRate,
      gain: 0.25
    }));
  });

  stream = sound.pipe(decoder);
};

[1,2,3].forEach(function (num) {
  (function () {
    var sound = fs.createReadStream('legendary_sound.mp3');
    setTimeout(function () {
      mumble.connect(process.env.MUMBLE_URL, function (err, c) {
        if (err) { throw new Error(err); }
        c.authenticate('drop-' + num, process.env.MUMBLE_PASS);
        c.on('initialized', function () {
          dropSound(c, sound);
        });
      });
    }, 500);
  }(num));
});
