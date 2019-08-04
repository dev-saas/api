const { auth } = require('../services/firebase-service')

module.exports = async token => {
  try {
    const decodedToken = await auth.verifyIdToken(token)
    return { id: decodedToken.uid }
  } catch (err) {
    console.log(err)
    return null
  }
}
