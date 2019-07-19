const ObjectId = require('mongodb').ObjectID

const infoToProjection = ({ fieldNodes }) => {
  let requestedAttributes = {}
  fieldNodes[0].selectionSet.selections.map(
    ({ name: { value } }) => (requestedAttributes[value] = 1)
  )
  return requestedAttributes
}

const pagination = async (collection, page, info) => {
  const pageSize = page ? page.pageSize : 10
  const cursor = page ? page.cursor : ''
  const params = cursor ? { _id: { $gt: ObjectId(cursor) } } : undefined
  const edges = await collection
    .find(params, infoToProjection(info))
    .limit(pageSize)
    .toArray()
  const response = {
    pageInfo: {
      hasNextPage: pageSize <= edges.length,
      cursor: edges[0] ? edges.slice(-1)[0]._id : ''
    },
    edges
  }
  return response
}

module.exports = {
  pagination,
  infoToProjection
}
