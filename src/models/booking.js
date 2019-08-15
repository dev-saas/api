const { Schema, model } = require('mongoose')
const { addTypes, secureUpdatePlugin } = require('./plugins/secureUpdatePlugin')

const schema = {
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
}

addTypes(schema)

const bookingSchema = new Schema(schema, { timestamps: true })

bookingSchema.plugin(require('./plugins/paginationPlugin'))
bookingSchema.plugin(secureUpdatePlugin)
bookingSchema.plugin(require('./plugins/dataloaderPlugin'))

module.exports = model('Booking', bookingSchema)
