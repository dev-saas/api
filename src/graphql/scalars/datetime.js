const { Scalar } = require('./Scalar')
const { INVALID_DATE } = require('../error')

exports.resolver = {
  DateTime: Scalar({
    name: 'DateTime',
    parseValue: value => {
      try {
        return new Date(value)
      } catch (err) {
        throw new Error(INVALID_DATE)
      }
    }
  })
}
