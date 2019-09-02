exports.resolver = {
  Post: {
    owner: ({ owner }, _, { controllers }, info) =>
      controllers.user.load(owner, info, 'uid'),

    comments: ({ _id }, { page }, { controllers }) =>
      controllers.comment.getPage(page, { post: _id })
  },

  Posts: {
    nodes: ({ nodes }, _, { controllers }, info) =>
      controllers.post.loadMany(nodes, info)
  },

  Query: {
    posts: (_, { page }, { controllers }) =>
      controllers.post.getPage(page, { private: false }),

    post: (_, { id }, { controllers }, info) =>
      controllers.post.findById(id, info)
  },

  Mutation: {
    newPost: (_, { post }, { user, controllers }) =>
      controllers.post.create(user, post),

    updatePost: (_, { post }, { user, controllers }, info) =>
      controllers.post.update(user, post, info),

    deletePost: (_, { id }, { user, controllers }, info) =>
      controllers.post.remove(user, id, info)
  }
}
