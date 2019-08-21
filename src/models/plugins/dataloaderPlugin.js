const DataLoader = require('dataloader')
const ObjectId = require('mongodb').ObjectID
const { infoToProjection } = require('../utils/mongodb-utils')

function LoaderUID (model, info) {
  return new DataLoader(async uids =>
    model.find({ uid: { $in: uids } }, infoToProjection(info))
  )
}

function Loader (model, info) {
  return new DataLoader(async ids =>
    model
      .find({ _id: { $in: ids.map(id => ObjectId(id)) } }, infoToProjection(info))
      .sort({ createdAt: -1 })
  )
}

module.exports = function (schema) {
  schema.statics.load = function (id, info, params = { uid: false }) {
    return params.uid ? LoaderUID(this, info).load(id) : Loader(this, info).load(id)
  }

  schema.statics.loadMany = function (ids, info, params = { uid: false }) {
    return params.uid
      ? LoaderUID(this, info).loadMany(ids)
      : Loader(this, info).loadMany(ids)
  }
}
