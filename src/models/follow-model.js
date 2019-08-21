const { Schema, model } = require('mongoose')
const {
  dataloaderPlugin,
  paginationPlugin,
  secureUpdatePlugin: { secureUpdatePlugin, addTypes }
} = require('./plugins')

const schema = {
  following: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['ACCEPTED', 'PENDING'],
    required: true
  }
}

addTypes(schema)

const followSchema = new Schema(schema, { timestamps: true })

followSchema.plugin(paginationPlugin)
followSchema.plugin(secureUpdatePlugin)
followSchema.plugin(dataloaderPlugin)

module.exports = model('Follow', followSchema)
