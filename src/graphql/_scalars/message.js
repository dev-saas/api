const { Scalar } = require('./Scalar')
const { MESSAGE_TOO_LONG } = require('../error')

exports.resolver = {
  Message: Scalar({
    name: 'Message',
    parseValue: value => {
      if (value.length > 256) throw new Error(MESSAGE_TOO_LONG)
      return value
    }
  })
}
