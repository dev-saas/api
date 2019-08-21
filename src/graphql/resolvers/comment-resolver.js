const { withFilter } = require('graphql-subscriptions')

exports.resolver = {
  Comment: {
    owner: ({ owner }, _, { controllers }, info) =>
      controllers.user.load(owner, info, true),

    post: ({ post }, _, { controllers }, info) => controllers.post.load(post, info)
  },

  CommentsConnection: {
    edges: ({ edges }, _, { controllers }, info) =>
      controllers.comment.loadMany(edges, info)
  },

  Mutation: {
    commentPost: (_, { comment }, { user, controllers }) =>
      controllers.comment.create(user, comment)
  },

  Subscription: {
    newComment: {
      resolve: ({ newComment }, _, { controllers }, info) =>
        controllers.comment.load(newComment._id, info),

      subscribe: withFilter(
        (_, args, { controllers }) => controllers.comment.newSubscription(),
        ({ newComment }, { post }, { controllers }) =>
          controllers.subscription.check(newComment.post, post)
      )
    },

    updatedComment: {
      resolve: ({ updatedComment }, _, { controllers }, info) =>
        controllers.comment.load(updatedComment._id, info),

      subscribe: withFilter(
        (_, args, { controllers }) => controllers.comment.updateSubscription(),
        ({ updatedComment }, { comment }, { controllers }) =>
          controllers.subscription.check(updatedComment._id, comment)
      )
    }
  }
}
