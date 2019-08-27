// require all files with -model.js
require('fs')
  .readdirSync(__dirname)
  .forEach((file) => file.includes('-model.js') && require('./' + file))
