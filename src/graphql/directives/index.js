const isAuth = require('./isAuth')
const recatpcha = require('./recaptcha')
const protect = require('./protect')

module.exports = {
  ...isAuth,
  ...recatpcha,
  ...protect
}
