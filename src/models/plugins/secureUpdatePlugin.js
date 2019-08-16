const { NOT_FOUND } = require('../../graphql/error')
const { infoToProjection } = require('../utils/mongodb-utils')

function addTypes(schema) {
  schema.owner = {
    type: String,
    required: true
  }
}

function secureUpdatePlugin(schema) {
  schema.index({ owner: 1 })

  schema.statics.secureUpdate = async function(owner, { _id, ...obj }, info) {
    const updated = await this.findOneAndUpdate({ _id, owner }, obj, {
      new: true,
      projection: infoToProjection(info)
    })
    if (!updated) throw new Error(NOT_FOUND)
    return updated
  }

  schema.statics.secureRemove = async function(owner, _id) {
    const deleted = await this.deleteOne({ _id, owner })
    if (deleted.deletedCount < 1) throw new Error(NOT_FOUND)
    return true
  }

  schema.statics.secureFind = async function(owner, _id) {
    const res = await this.findOne({ _id, owner })
    if (!res) throw new Error(NOT_FOUND)
    return res
  }

  schema.statics.findByOwner = async function(owner, info) {
    const res = await this.find({ owner }, infoToProjection(info))
    if (!res) throw new Error(NOT_FOUND)
    return res
  }

  schema.statics.exists = async function(_id) {
    const res = await this.findOne({ _id }, { _id })
    if (!res) throw new Error(NOT_FOUND)
    return res
  }
}

module.exports = { addTypes, secureUpdatePlugin }
