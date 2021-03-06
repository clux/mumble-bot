# mumble-bot
[![build status](https://secure.travis-ci.org/clux/mumble-bot.svg)](http://travis-ci.org/clux/mumble-bot)
[![dependency status](https://david-dm.org/clux/mumble-bot.svg)](https://david-dm.org/clux/mumble-bot)

An experiment in reading data from mumble.

## Usage
Set the mumble url as an environment variable and start:

```sh
export MUMBLE_URL=mumble://host:port/
export MUMBLE_CHAN=channel
export MUMBLE_USER=username
export MUMBLE_PASS=*******
mumble-bot
```

Note that this expects valid certificate files in your current working directory.

## Installation
Currently a private module, so clone, install deps, and link:

```sh
git clone https://github.com/clux/mumble-bot.git
cd mumble-bot
npm install
npm link
```

## Certificate
If you have a valid certificate with mumble, you can reuse the exported one here by converting it to a pem files using `openssl`:

```sh
openssl pkcs12 -in mumble_cert.p12 -out key.pem -nodes -nocerts
openssl pkcs12 -in mumble_cert.p12 -out cert.pem -nodes -nokeys
```

## Fun Usage
Play the diablo legendary drop sound with 3 simultaneously connecting clients to troll people

```sh
# set same environment variables as above (NB: MUMBLE_USER ignored)
mumble-drops
```

Just note that you will be banned with more than 10 connects within a two minute time frame.

## Recording and playback
Functionality of the main bot.

```sh
# stream to test.pcm
mumble-bot -u user -o test.pcm
# whisper to user (also accepts wav)
mumble-bot -u user -i test.pcm
```

## Using PCM data
For posterity:

```sh
# playback through `play` or use same arguments to `sox` to save as wav
sox -t raw -r 48k -e signed -b 16 -c 1 test.pcm test.wav
# convert to mp3
lame test.wav test.mp3
```
