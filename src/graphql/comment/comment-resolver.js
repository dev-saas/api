const { withFilter } = require('graphql-subscriptions')

exports.resolver = {
  Comment: {
    owner: ({ owner }, _, { controllers }, info) =>
      controllers.user.load(owner, info, 'uid'),

    post: ({ post }, _, { controllers }, info) =>
      controllers.post.load(post, info)
  },

  Comments: {
    nodes: ({ nodes }, _, { controllers }, info) =>
      controllers.comment.loadMany(nodes, info)
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
