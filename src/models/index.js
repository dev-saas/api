require('fs')
  .readdirSync(__dirname)
  .forEach(function(file) {
    if (file.includes('.js') && !file.includes('index')) {
      require('./' + file)
    }
  })
