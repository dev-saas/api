const { Schema, model } = require('mongoose')
const paginationPlugin = require('mongoose-plugin-cursor-pagination')
const dataloaderPlugin = require('mongoose-plugin-dataloader')
const {
  secureUpdatePlugin: { secureUpdatePlugin, addTypes }
} = require('./plugins')

const schema = {
  message: {
    type: String,
    required: true
  },
  private: {
    type: Boolean,
    default: false
  }
}

addTypes(schema)

const postSchema = new Schema(schema, { timestamps: true })

postSchema.plugin(secureUpdatePlugin)
postSchema.plugin(dataloaderPlugin)
postSchema.plugin(paginationPlugin)

module.exports = model('Post', postSchema)
