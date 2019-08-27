const { auth } = require('../services/firebase-service')

module.exports = async token => {
  if (!token) return null
  try {
    const { uid } = await auth.verifyIdToken(token)
    return uid
  } catch (err) {
    return null
  }
}
