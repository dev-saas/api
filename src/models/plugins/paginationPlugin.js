const ObjectId = require('mongodb').ObjectID

module.exports = function (schema) {
  schema.statics.getPage = async function (
    page = {
      size: 10,
      cursor: undefined
    },
    params = {},
    key = '_id',
    sort = -1
  ) {
    const { size, cursor } = page

    if (cursor) {
      if (sort == -1) {
        params = { _id: { $lt: ObjectId(cursor) }, ...params }
      } else {
        params = { _id: { $gt: ObjectId(cursor) }, ...params }
      }
    }

    const nodes = await this.find(params, key)
      .sort({ _id: sort })
      .limit(size)

    return {
      cursor: (nodes[0] && nodes.slice(-1)[0]._id) || '',
      hasNextPage: nodes.length === size,
      nodes: nodes.map(node => node[key])
    }
  }
}
