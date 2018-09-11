'use strict';
const
  fs = require('fs'),
  net = require('net'),
  filename = process.argv[2];

let watcher = fs.watchFile(filename, function() {});

let server = net.createServer(function(connection) {
  //reporting
  console.log("Subscriber connected.");
  connection.write(JSON.stringify({
    type: 'watching',
    file: filename
  }) + '\n');

  //watcher setup
  watcher.on('change', function() {
    connection.write(JSON.stringify({
      type: 'changed',
      file: filename,
      timestamp: Date.now()
    }) + '\n');
  });

  connection.on('close', function() {
    console.log('Subscriber disconnected.');
  });
});

if (!filename) {
  throw Error('No target filename was specified.');
}

server.on('close', function() {
  fs.unwatchFile(filename);
})

server.listen(5455, function() {
  console.log('Listening for subscribers...')
});