'use strict';
const
  fs = require('fs'),
  net = require('net'),
  filename = process.argv[2];

let server = net.createServer(function(connection) {
  //reporting
  console.log("Subscriber connected.");
  connection.write("Now watching '" + filename + "' for changes...\n");

  //watcher setup
  let watcher = fs.watchFile(filename, function() {
    connection.write("File '" + filename + "' changed: " + Date.now() + "\n");
  });

  connection.on('close', function() {
    console.log('Subscriber disconnected.');
    watcher.close();
  });
});

if (!filename) {
  throw Error('No target filename was specified.');
}

server.listen(5455, function() {
  console.log('Listening for subscribers...')
});