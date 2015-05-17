#!/usr/bin/env node
var mumble = require('mumble');
var fs = require('fs');
var join = require('path').join;

var url = process.env.MUMBLE_URL;
var options = {
  key: fs.readFileSync(join(process.cwd(), 'key.pem')),
  cert: fs.readFileSync(join(process.cwd(), 'cert.pem'))
};


console.log('Connecting');
mumble.connect(url, options, function (err, c) {
  if (err) { throw new Error(err); }

  console.log('Connected');
  //c.authenticate('ExampleUser');
  c.on('initialized', function () {
    console.log('Connection initialized');
    // Connection is authenticated and usable.
  });
  c.on('voice', function (event) {
    console.log('Mixed voice');
    var pcmData = event.data;
  });
});
