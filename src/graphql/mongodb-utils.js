const ObjectId = require('mongodb').ObjectID
const DataLoader = require('dataloader')

const infoToProjection = ({ fieldNodes }) => {
  let requestedAttributes = {}
  fieldNodes[0].selectionSet.selections.map(
    ({ name: { value } }) => (requestedAttributes[value] = 1)
  )
  return requestedAttributes
}

const pagination = collection => {
  const get = async (page, info, params = undefined) => {
    const pageSize = page.pageSize || 10
    const cursor = page.cursor || undefined

    if (cursor && params) {
      params = { $and: [{ _id: { $gt: ObjectId(cursor) }, ...params }] }
    } else if (cursor) {
      params = { _id: { $gt: ObjectId(cursor) } }
    }

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

  return { get }
}

const Dataloader = Model => {
  const Loader = info => {
    return new DataLoader(async ids =>
      (await Model.find(
        { _id: { $in: ids.map(id => ObjectId(id)) } },
        infoToProjection(info)
      )).sort(
        (a, b) =>
          ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
      )
    )
  }
  return { Loader }
}

const secureUpdate = async (model, user, { _id, ...obj }, info) => {
  const updated = await model.findOneAndUpdate(
    { _id: _id, creator: user.id },
    obj,
    { new: true, projection: infoToProjection(info) }
  )
  if (!updated) throw new Error('Not found')
  return updated
}

module.exports = {
  pagination,
  infoToProjection,
  Dataloader,
  secureUpdate
}
