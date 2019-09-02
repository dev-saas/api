exports.resolver = {
  Notifications: {
    nodes: ({ nodes }, _, { controllers }, info) =>
      controllers.notification.loadMany(nodes, info)
  }
}
