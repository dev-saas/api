const { WRONG_ROLE } = require('../error')
const { isAuth } = require('./isAuth')

module.exports = {
  protect (next, _, { roles }, { user }) {
    isAuth(next, null, null, { user })

    if (!roles.includes(user.role)) throw new Error(WRONG_ROLE)

    return next()
  }
}
