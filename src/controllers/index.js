const loadPlugins = (model, db, controller) => {
  model = model.charAt(0).toUpperCase() + model.slice(1)

  controller.getPage = (page, params, key = '_id') => db[model].getPage(page, params, key)

  controller.load = (id, info, uid = false) => db[model].load(id, info, { uid })

  controller.loadMany = (ids, info, uid = false) => db[model].loadMany(ids, info, { uid })

  return controller
}

module.exports = (db, pubsub, mqtt) => {
  let controllers = {}

  require('fs')
    .readdirSync(__dirname)
    .forEach(function (file) {
      if (file.includes('.js') && !file.includes('index')) {
        let controller = file.replace('-controller.js', '')
        loadPlugins(
          controller,
          db.models,
          (controllers[file.replace('-controller.js', '')] = require('./' + file)(
            db.models,
            pubsub,
            mqtt
          ))
        )
      }
    })

  return controllers
}
