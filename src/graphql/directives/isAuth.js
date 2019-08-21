const { UNAUTHENTICATED } = require('../error')

module.exports = {
  isAuth (next, _, requires, { user }) {
    if (!user) throw new Error(UNAUTHENTICATED)

    return next()
  }
}
