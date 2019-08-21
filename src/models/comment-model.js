const { Schema, model } = require('mongoose')
const {
  dataloaderPlugin,
  paginationPlugin,
  secureUpdatePlugin: { secureUpdatePlugin, addTypes }
} = require('./plugins')

const schema = {
  comment: {
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
