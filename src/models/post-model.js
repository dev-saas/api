const { Schema, model } = require('mongoose')
const {
  dataloaderPlugin,
  paginationPlugin,
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
