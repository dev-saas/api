const { UNAUTHENTICATED, UNAUTHORIZED } = require('../error')

module.exports = {
  isAuth (next, _, require, { user }) {
    if (!user) throw new Error(UNAUTHENTICATED)

    if (require && require.roles && require.roles.length > 0 && !require.roles.includes(user.role)) {
      throw new Error(UNAUTHORIZED)
    }

    return next()
  }
}
