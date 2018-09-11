'use strict';
const
  net = require('net');

let server = net.createServer(function(connection) {
  //reporting
  console.log("Subscriber connected.");
  
  connection.write('{"type": "changed", "file": "targ');

  let timer = setTimeout(function() {
    connection.write('et.txt", "timestamp": 1358175758495}' + "\n");
    connection.end();
  }, 1000)

  connection.on('end', function() {
    clearTimeout(timer);
    console.log('Subscriber disconnected');
  });
});

server.listen(5455, function() {
  console.log('Test server listening for subscribers...')
});