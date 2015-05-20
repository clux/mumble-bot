#!/usr/bin/env node
var mumble = require('mumble');
var fs = require('fs');
var join = require('path').join;
var argv = require('yargs')
  .describe('o', 'Output pcm')
  .describe('i', 'Input pcm')
  .describe('u', 'User source/destination')
  .argv;

var url = process.env.MUMBLE_URL;
var options = {
  key: fs.readFileSync(join(process.cwd(), 'key.pem')),
  cert: fs.readFileSync(join(process.cwd(), 'cert.pem'))
};

if (argv.o) {
  var output = join(process.cwd(), argv.o);
}
if (argv.i) {
  var input = join(process.cwd(), argv.i);
}

console.log('Connecting to', url);
mumble.connect(url, options, function (err, c) {
  if (err) { throw new Error(err); }

  c.authenticate(process.env.MUMBLE_USER, process.env.MUMBLE_PASS);

  console.log('Connected');
  c.on('ready', function () {
    console.log('Connection initialized');

    var source = argv.u ? c.userByName(argv.u) : c;
    if (c) {
      console.log('Got stream');
      if (argv.o) {
        console.log('recording');
        source.outputStream().pipe(fs.createWriteStream(output));
      }
      if (argv.i) {
        console.log('playing');
        fs.createReadStream(input).pipe(source.inputStream());
      }
    }
  });
});
