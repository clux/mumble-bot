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
  c.on('initialized', function () {
    console.log('Connection initialized');
    // Connection is authenticated and usable.
  });
  c.on('voice', function (event) {
    console.log('Mixed voice', event);
    //var pcmData = event.data;
  });
});
