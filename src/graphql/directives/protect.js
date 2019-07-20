module.exports = {
  protect(next, _, { roles }, { user }) {
    if (user && roles.includes(user.role)) return next()
    throw new Error('Wrong role')
  }
}
