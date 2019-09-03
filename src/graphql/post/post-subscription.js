const { withFilter } = require('graphql-subscriptions')

exports.resolver = {
  Subscription: {
    newPost: {
      resolve: ({ newPost }, _, { controllers }, info) =>
        controllers.post.load(newPost._id, info),

      subscribe: withFilter(
        (_, args, { controllers }) => controllers.post.newSubscription(),
        ({ newPost }, { uid }) => newPost.owner == uid
      )
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
