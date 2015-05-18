#!/usr/bin/env node
var mumble = require('mumble');
var fs = require('fs');
var join = require('path').join;
var lame = require('lame');

var url = process.env.MUMBLE_URL;
var options = {
  key: fs.readFileSync(join(process.cwd(), 'key.pem')),
  cert: fs.readFileSync(join(process.cwd(), 'cert.pem'))
};

var pipeMp3 = function (client, mp3) {
  var decoder = new lame.Decoder();
  var mp3stream = fs.createReadStream(mp3);

  var stream;
  decoder.on('format', function(format) {
    console.log(format);

    stream.pipe(client.inputStream({
      channels: format.channels,
      sampleRate: format.sampleRate,
      gain: 0.25
    }));
  });

  stream = mp3stream.pipe(decoder);
};


console.log('Connecting to', url);
mumble.connect(url, options, function (err, c) {
  if (err) { throw new Error(err); }

  c.authenticate(process.env.MUMBLE_USER, process.env.MUMBLE_PASS);

  console.log('Connected');
  c.on('initialized', function () {
    console.log('Connection initialized');
    // Connection is authenticated and usable.
    if (process.argv[2]) {
      console.log('playing', process.argv[2])
      pipeMp3(c, process.argv[2]);
    }
  });
  c.on('voice', function (event) {
    console.log('Mixed voice');
    //var pcmData = event.data;
  });
});
