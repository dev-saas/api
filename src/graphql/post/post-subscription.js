const { withFilter } = require('graphql-subscriptions')

exports.resolver = {
  Subscription: {
    newPost: {
      subscribe: (_, args, { controllers }) =>
        controllers.post.newSubscription()
    },

    updatedPost: {
      resolve: ({ updatedPost }, _, { controllers }, info) =>
        controllers.post.load(updatedPost._id, info),

      subscribe: withFilter(
        (_, args, { controllers }) => controllers.post.updateSubscription(),
        ({ updatedPost }, { post }) => updatedPost._id == post
      )
    }
  }
}
