const { withFilter } = require('graphql-subscriptions')

exports.resolver = {
  Post: {
    owner: ({ owner }, _, { controllers }, info) =>
      controllers.user.load(owner, info, true),

    comments: ({ _id }, { page }, { controllers }) =>
      controllers.comment.getPage(page, { post: _id })
  },

  PostsConnection: {
    edges: ({ edges }, _, { controllers }, info) => controllers.post.loadMany(edges, info)
  },

  Query: {
    posts: (_, { page }, { controllers }) =>
      controllers.post.getPage(page, { private: false }),

    post: (_, { id }, { controllers }, info) => controllers.post.findById(id, info)
  },

  Mutation: {
    newPost: (_, { post }, { user, controllers }) => controllers.post.create(user, post),

    updatePost: (_, { post }, { user, controllers }, info) =>
      controllers.post.update(user, post, info),

    deletePost: (_, { id }, { user, controllers }, info) =>
      controllers.post.remove(user, id, info)
  },

  Subscription: {
    newPost: {
      subscribe: (_, args, { controllers }) => controllers.post.newSubscription()
    },

    updatedPost: {
      resolve: ({ updatedPost }, _, { controllers }, info) =>
        controllers.post.load(updatedPost._id, info),

      subscribe: withFilter(
        (_, args, { controllers }) => controllers.post.updateSubscription(),
        ({ updatedPost }, { post }, { controllers }) =>
          controllers.subscription.check(updatedPost._id, post)
      )
    }
  }
}
