const { auth } = require('./firebase-service')

const AuthService = db => {
  const { User } = db.models

  const register = async token => {
    const decodedToken = await auth.verifyIdToken(token)
    await User.register(decodedToken.uid, decodedToken.email)
    return true
  }

  return { register }
}

module.exports = AuthService
