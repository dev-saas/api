const { infoToProjection } = require('../utils/mongodb-utils')
const ObjectId = require('mongodb').ObjectID

module.exports = function(schema) {
  schema.statics.getPage = async function(page, info, params = undefined) {
    const pageSize = page.pageSize || 10
    const cursor = page.cursor || undefined
    if (cursor && params) {
      params = { $and: [{ _id: { $gt: ObjectId(cursor) }, ...params }] }
    } else if (cursor) {
      params = { _id: { $gt: ObjectId(cursor) } }
    }

    const edges = await this.find(params, infoToProjection(info)).limit(
      pageSize
    )
    const response = {
      pageInfo: {
        hasNextPage: pageSize <= edges.length,
        cursor: edges[0] ? edges.slice(-1)[0]._id : ''
      },
      edges: edges.map(({ _id }) => _id)
    }
    return response
  }
}
