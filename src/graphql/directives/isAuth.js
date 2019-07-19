module.exports = {
  isAuth(next, _, requires, { user }) {
    if (!user) throw new Error('Unauthenticated')
    return next()
  }
}
