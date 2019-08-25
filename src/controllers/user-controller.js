module.exports = ({ mongo: { User }, firebase: { auth } }) => {
  return {
    register: async token => {
      const { uid, email } = await auth.verifyIdToken(token)
      await User.register(uid, email)
      return true
    },

    update: (uid, user, info) => User.update(uid, user, info),

    findByUID: (uid, info, params) => User.findByUID(uid, info, params),

    findByUsername: (username, info) => User.findByUsername(username, info),

    isPrivate: id => User.isPrivate(id),

    search: (username, page) =>
      User.getPage(page, { username: new RegExp(username, 'i') }, 'uid')
  }
}
