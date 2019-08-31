const { auth } = require('../services/firebase-service')
const decode = require('jwt-decode')
module.exports = async token => {
  if (!token) return null
  try {
    if (process.env.NODE_ENV.includes('test' || 'travis')) {
      const { uid } = decode(token)
      return uid
    }
    const { uid } = await auth.verifyIdToken(token)
    return uid
  } catch (err) {
    return null
  }
}
