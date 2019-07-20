module.exports = {
  isAuth(next, _, requires, { user }) {
    if (user) return next()
    throw new Error('Unauthenticated')
  }
}
