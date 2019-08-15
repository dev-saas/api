const { isISO8601 } = require('validator')
const { Scalar } = require('./Scalar')
const { INVALID_DATE } = require('../error')

exports.resolver = {
  DateTime: Scalar({
    name: 'DateTime',
    parseValue: value => {
      if (isISO8601(value)) {
        return value
      }
      throw new Error(INVALID_DATE)
    },
    serialize: value => {
      return new Date(value).toISOString()
    }
  })
}
