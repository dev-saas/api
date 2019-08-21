const { Schema, model } = require('mongoose')
const {
  dataloaderPlugin,
  secureUpdatePlugin: { secureUpdatePlugin, addTypes }
} = require('./plugins')

const schema = {
  message: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  }
}

addTypes(schema)

const notificationSchema = new Schema(schema, { timestamps: true })

notificationSchema.plugin(secureUpdatePlugin)
notificationSchema.plugin(dataloaderPlugin)

module.exports = model('Notification', notificationSchema)
