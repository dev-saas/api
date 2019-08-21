let directives = {}

require('fs')
  .readdirSync(__dirname)
  .forEach(function (file) {
    if (file.includes('.js') && !file.includes('index')) {
      directives = { ...directives, ...require('./' + file) }
    }
  })

module.exports = directives
