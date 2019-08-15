const { Schema, model } = require('mongoose')
const { addTypes, secureUpdatePlugin } = require('./plugins/secureUpdatePlugin')

const schema = {
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}

addTypes(schema)

const eventSchema = new Schema(schema)

eventSchema.plugin(secureUpdatePlugin)
eventSchema.plugin(require('./plugins/dataloaderPlugin'))
eventSchema.plugin(require('./plugins/paginationPlugin'))

module.exports = model('Event', eventSchema)
