module.exports = (db, pubsub, mqtt) => {
  let controllers = {}

  require('fs')
    .readdirSync(__dirname)
    .forEach(function(file) {
      if (file.includes('.js') && !file.includes('index')) {
        controllers[file.replace('-controller.js', '')] = require('./' + file)(
          db,
          pubsub,
          mqtt
        )
      }
    })

  return controllers
}
