const fs = require('fs')
fs.watch('target.txt', function() {
  console.log("File 'target.txt' just changed!")
});
console.log("Watching 'target.txt' for changes");