const { WRONG_ROLE, UNAUTHENTICATED } = require('../error')

module.exports = {
  protect(next, _, { roles }, { user }) {
    if (!user) throw new Error(UNAUTHENTICATED)

    if (!roles.includes(user.role)) throw new Error(WRONG_ROLE)

    return next()
  }
}
