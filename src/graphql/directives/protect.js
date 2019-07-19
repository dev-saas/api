module.exports = {
  protect(next, _, { roles }, { user }) {
    if (roles.includes(user.role)) return next()
    throw new Error('Wrong role')
  }
}
