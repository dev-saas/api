const { NOT_ALLOWED } = require('../error')
const { isAuth } = require('./isAuth')

module.exports = {
  async private (next, privateUser, requires, { user, controllers }) {
    // if the requested user is not private pass
    if (!(await controllers.user.isPrivate(privateUser._id))) return next()

    // check if request is authenticated
    isAuth(next, null, null, { user })

    // check if context user is requested user
    if (user === privateUser.uid) return next()

    // check if context user is requested user's follower
    if (await controllers.follow.isFollower(user, privateUser.uid)) {
      return next()
    }

    throw new Error(NOT_ALLOWED)
  }
}
