exports.resolver = {
  Users: {
    nodes: ({ nodes }, _, { controllers }, info) =>
      controllers.user.loadMany(nodes, info, 'uid')
  },

  User: {
    followers: ({ uid }, { page }, { controllers }, info) =>
      controllers.follow.followers(uid, page, info),

    following: ({ uid }, { page }, { controllers }, info) =>
      controllers.follow.following(uid, page, info),

    posts: ({ _id }, { page }, { controllers }, info) =>
      controllers.post.findByUserID(_id, page, info),

    notifications: ({ uid }, { page }, { controllers }, info) =>
      controllers.notification.findByUserUID(uid, page, info)
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
    register: (_, { token, username }, { controllers }) =>
      controllers.user.register(token, username),

    updateUser: (_, params, { user, controllers }, info) =>
      controllers.user.update(user, params.user, info),

    follow: (_, { uid }, { user, controllers }) =>
      controllers.follow.follow(user, uid)
  }
}
