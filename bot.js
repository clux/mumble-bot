#!/usr/bin/env node
var mumble = require('mumble');
var fs = require('fs');
var join = require('path').join;

var url = process.env.MUMBLE_URL;
var options = {
  key: fs.readFileSync(join(process.cwd(), 'key.pem')),
  cert: fs.readFileSync(join(process.cwd(), 'cert.pem'))
};

console.log('Connecting to', url);
mumble.connect(url, options, function (err, c) {
  if (err) { throw new Error(err); }

  c.authenticate(process.env.MUMBLE_USER, process.env.MUMBLE_PASS);

  console.log('Connected');
  c.on('ready', function () {
    console.log('Connection initialized');
    // user record
    //var u = c.userByName('clux')
    //console.log(u.id, u.name);
    //u.outputStream().pipe(fs.createWriteStream('./test.pcm'));

    // global record
    //console.log('recording', c.ready)
    //c.outputStream().pipe(fs.createWriteStream('./test.pcm'));

    // playback
    //console.log('playing back', c.ready)
    //fs.createReadStream('./test.pcm').pipe(c.inputStream());
  });
});
