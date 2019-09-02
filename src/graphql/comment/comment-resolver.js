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
  }
}
