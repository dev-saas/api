const DataLoader = require('dataloader')
const { infoToProjection } = require('./mongodb-utils')
const ObjectId = require('mongodb').ObjectID

const Loader = (collection, info) =>
  new DataLoader(ids =>
    collection
      .find(
        { _id: { $in: ids.map(id => ObjectId(id)) } },
        infoToProjection(info)
      )
      .toArray()
  )

module.exports = Loader
