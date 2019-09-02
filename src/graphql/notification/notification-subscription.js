const { withFilter } = require('graphql-subscriptions')

exports.resolver = {
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
