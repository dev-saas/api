const ObjectId = require('mongodb').ObjectID

module.exports = function (schema) {
  schema.statics.getPage = async function (page = {}, params = undefined, key = '_id') {
    const pageSize = page.pageSize || 10
    const cursor = page.cursor || undefined

    if (cursor && params) {
      params = { $and: [{ _id: { $lt: ObjectId(cursor) }, ...params }] }
    } else if (cursor) {
      params = { _id: { $lt: ObjectId(cursor) } }
    }

    const edges = await this.find(params, `${key}`)
      .sort({ createdAt: -1 })
      .limit(pageSize)
    return {
      pageInfo: {
        hasNextPage: pageSize <= edges.length,
        cursor: edges[0] ? edges.slice(-1)[0]._id : ''
      },
      edges: edges.map(edge => edge[`${key}`])
    }
  }
}
