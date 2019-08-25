// exports all directives
let services = {}

require('fs')
  .readdirSync(__dirname)
  .forEach(file => {
    if (file.includes('-service.js')) {
      let name = file.replace('-service.js', '')
      services[name] = require('./' + file)
    }
  })

module.exports = services
