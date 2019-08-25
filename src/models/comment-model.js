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
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
}

addTypes(schema)

const commentSchema = new Schema(schema, { timestamps: true })

commentSchema.plugin(secureUpdatePlugin)
commentSchema.plugin(dataloaderPlugin)
commentSchema.plugin(paginationPlugin)

module.exports = model('Comment', commentSchema)
