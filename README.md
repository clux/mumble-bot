# mumble-bot
An experiment in reading data from mumble.

## Usage
Set the mumble url as an environment variable and start:

```sh
export MUMBLE_URL=mumble://user:pass@host:port/"Chan"
mumble-bot
```

Note that this expects valid certificate files in your current working directory.

## Installation
Currently a private module, so clone, install deps, and link:

```sh
git clone THISREPO
cd THISREPO
npm install
npm link
```

## Certificate
If you have a valid certificate with mumble, you can reuse the exported one here by converting it to a pem files using `openssl`:

```sh
openssl pkcs12 -in ../mumble_cert.p12 -out key.pem -nodes -nocerts
openssl pkcs12 -in ../mumble_cert.p12 -out cert.pem -nodes -nokeys
```
