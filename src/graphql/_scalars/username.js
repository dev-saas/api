const { Scalar } = require('./Scalar')
const { USERNAME_TOO_LONG, INVALID_USERNAME } = require('../error')

const regex = RegExp(/^[A-Za-z][A-Za-z0-9]*(?:_+)*$/)

exports.resolver = {
  Username: Scalar({
    name: 'Username',
    parseValue: value => {
      if (value.length > 30) throw new Error(USERNAME_TOO_LONG)
      if (!regex.test(value)) throw new Error(INVALID_USERNAME)
      return value
    }
  })
}
