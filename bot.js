#!/usr/bin/env node
var mumble = require('mumble');
var fs = require('fs');
var join = require('path').join;
var argv = require('yargs')
  .describe('o', 'Output file')
  .describe('u', 'User stream to target')
  .string('o')
  .string('u')
  .describe('i', 'Input source')
  .string('i')
  .argv;

var url = process.env.MUMBLE_URL;
var options = {
  key: fs.readFileSync(join(process.cwd(), 'key.pem')),
  cert: fs.readFileSync(join(process.cwd(), 'cert.pem'))
};

var output = join(process.cwd(), argv.o);
var input = join(process.cwd(), argv.p);

console.log('Connecting to', url);
mumble.connect(url, options, function (err, c) {
  if (err) { throw new Error(err); }

  c.authenticate(process.env.MUMBLE_USER, process.env.MUMBLE_PASS);

  console.log('Connected');
  c.on('ready', function () {
    console.log('Connection initialized');

    var source = argv.u ? c.userByName(argv.u) : c;
    if (argv.o) {
      console.log('recording');
      source.outputStream().pipe(fs.createWriteStream(output));
    }
    else if (argv.i) {
      console.log('playing');
      fs.createReadStream(input).pipe(source.inputStream());
    }
  });
});
