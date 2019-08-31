// inject getPage, load and loadMany to controllers
const loadPlugins = (model, models, controller) => {
  model = model.charAt(0).toUpperCase() + model.slice(1)

  controller.getPage = (page, params, key = '_id') => models[model].getPage(page, params, key)
  controller.load = (id, info, key) => models[model].load(id, info, key)
  controller.loadMany = (ids, info, key) => models[model].loadMany(ids, info, key)

  return controller
}

// inject the services to the controllers,
// and exports all controllers with -controller.js in name
module.exports = (services) => {
  services.models = services.mongo.models
  let controllers = {}
  require('fs')
    .readdirSync(__dirname)
    .forEach(file => {
      if (!file.includes('-controller.js')) return

      let name = file.replace('-controller.js', '')
      loadPlugins(
        name,
        services.mongo.models,
        controllers[name] = require('./' + file)(services)
      )
    })

  return controllers
}
