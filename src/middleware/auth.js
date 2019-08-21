const { auth } = require('../services/firebase-service')

module.exports = async token => {
  try {
    const { uid } = await auth.verifyIdToken(token)
    return uid
  } catch (err) {
    return null
  }
}
