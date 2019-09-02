const { auth } = require('../services/firebase-service')
const decode = require('jwt-decode')
module.exports = async token => {
  if (!token) return null
  try {
    if (process.env.NODE_ENV.includes('test') || process.env.NODE_ENV.includes('travis')) {
      const decoded = decode(token)
      return decoded.uid
    }
    const { uid } = await auth.verifyIdToken(token)
    return uid
  } catch (err) {
    return null
  }
}
