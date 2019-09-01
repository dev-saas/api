const { Schema, model } = require('mongoose')
const paginationPlugin = require('mongoose-plugin-cursor-pagination')
const dataloaderPlugin = require('mongoose-plugin-dataloader')
const {
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

followSchema.index({ owner: 1, following: 1 }, { unique: true })

followSchema.plugin(paginationPlugin)
followSchema.plugin(secureUpdatePlugin)
followSchema.plugin(dataloaderPlugin)

module.exports = model('Follow', followSchema)
