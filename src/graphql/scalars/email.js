const { isEmail } = require('validator')
const { Scalar } = require('./Scalar')
const { INVALID_EMAIL } = require('../error')

exports.resolver = {
  Email: Scalar({
    name: 'Email',
    parseValue: value => {
      if (isEmail(value)) {
        return value.toLowerCase()
      }
      throw new Error(INVALID_EMAIL)
    }
  })
}
