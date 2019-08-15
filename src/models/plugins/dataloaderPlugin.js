const DataLoader = require('dataloader')
const ObjectId = require('mongodb').ObjectID
const { infoToProjection } = require('../utils/mongodb-utils')

function LoaderUID(model, info) {
  return new DataLoader(async uids =>
    model.find({ uid: { $in: uids } }, infoToProjection(info))
  )
}

function Loader(model, info) {
  return new DataLoader(async ids =>
    (await model.find(
      { _id: { $in: ids.map(id => ObjectId(id)) } },
      infoToProjection(info)
    )).sort(
      (a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    )
  )
}

module.exports = function(schema, params = { uid: false }) {
  schema.statics.load = function(id, info) {
    return params.uid
      ? LoaderUID(this, info).load(id)
      : Loader(this, info).load(id)
  }

  schema.statics.loadMany = function(ids, info) {
    return params.uid
      ? LoaderUID(this, info).loadMany(ids)
      : Loader(this, info).loadMany(ids)
  }
}
