const { withFilter } = require('graphql-subscriptions')

exports.resolver = {
  Subscription: {
    newComment: {
      resolve: ({ newComment }, _, { controllers }, info) =>
        controllers.comment.load(newComment._id, info),

      subscribe: withFilter(
        (_, args, { controllers }) => controllers.comment.newSubscription(),
        ({ newComment }, { post }) => newComment.post == post
      )
    },

    updatedComment: {
      resolve: ({ updatedComment }, _, { controllers }, info) =>
        controllers.comment.load(updatedComment._id, info),

      subscribe: withFilter(
        (_, args, { controllers }) => controllers.comment.updateSubscription(),
        ({ updatedComment }, { comment }) => updatedComment._id == comment
      )
    }
  }
}
