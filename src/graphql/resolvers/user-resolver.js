exports.resolver = {
  UsersConnection: {
    edges: ({ edges }, _, { controllers }, info) =>
      controllers.user.loadMany(edges, info, true)
  },

  User: {
    followers: ({ uid }, { page }, { controllers }, info) =>
      controllers.follow.followers(uid, page, info),

    following: ({ uid }, { page }, { controllers }, info) =>
      controllers.follow.following(uid, page, info),

    posts: ({ _id }, { page }, { controllers }, info) =>
      controllers.post.findByUserID(_id, page, info),

    notifications: ({ _id }, _, { controllers }, info) =>
      controllers.notification.findByUserID(_id, info)
  },

  Query: {
    me: (_, params, { user, controllers }, info) =>
      controllers.user.findByUID(user, info),

    user: (_, { username }, { controllers }, info) =>
      controllers.user.findByUsername(username, info),

    users: (_, { username, page }, { controllers }) =>
      controllers.user.search(username, page)
  },

  Mutation: {
    register: (_, { token }, { controllers }) => controllers.user.register(token),

    updateUser: (_, params, { user, controllers }, info) =>
      controllers.user.update(user, params.user, info),

    follow: (_, { uid }, { user, controllers }) => controllers.follow.follow(user, uid)
  }
}
