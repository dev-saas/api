// exports all directives
let directives = {}

require('fs')
  .readdirSync(__dirname)
  .forEach(file => {
    if (file.includes('index')) return

    directives = { ...directives, ...require('./' + file) }
  })

module.exports = directives
