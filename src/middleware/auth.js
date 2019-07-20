const jwt = require('jsonwebtoken')

module.exports = authHeader => {
  if (!authHeader) {
    return null
  }

  const parts = authHeader.split(' ')

  if (!parts.length === 2) throw new Error('Invalid header')

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) throw new Error('Token malformatted')

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return { id: decodedToken.id, role: decodedToken.role }
  } catch (err) {
    throw err
  }
}
