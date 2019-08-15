const { auth } = require('../services/firebase-service')

module.exports = db => {
  const { User } = db.models

  const register = async token => {
    const { uid, email } = await auth.verifyIdToken(token)
    await User.register(uid, email)
    return true
  }

  return { register }
}
