const { withFilter } = require('graphql-subscriptions')

exports.resolver = {
  Notifications: {
    nodes: ({ nodes }, _, { controllers }, info) =>
      controllers.notification.loadMany(nodes, info)
  },
  Subscription: {
    newNotification: {
      resolve: ({ newNotification }, _, { controllers }, info) =>
        controllers.comment.load(newNotification._id, info),

      subscribe: withFilter(
        (_, args, { controllers }) =>
          controllers.notification.newSubscription(),
        ({ newNotification }, params, { user }) => newNotification.owner == user
      )
    }
  }
}
