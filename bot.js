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


console.log('Connecting to', url);
mumble.connect(url, options, function (err, c) {
  if (err) { throw new Error(err); }

  c.authenticate(process.env.MUMBLE_USER, process.env.MUMBLE_PASS);
  c.on('ready', function () {
    c.channelByName(process.env.MUMBLE_CHAN).join();

    var resource = argv.u ? c.userByName(argv.u) : c;
    var text = argv.u ? argv.u : process.env.MUMBLE_CHAN;
    if (c) {
      if (argv.o) {
        var output = join(process.cwd(), argv.o);
        console.log('●', text, '>', argv.o);
        resource.outputStream().pipe(fs.createWriteStream(output));
      }
      if (argv.i) {
        var input = join(process.cwd(), argv.i);
        console.log('▶',text, '<', argv.i);
        fs.createReadStream(input).pipe(resource.inputStream());
      }
    }
  });
});
