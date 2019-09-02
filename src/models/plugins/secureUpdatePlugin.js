const { NOT_FOUND } = require('../../graphql/error')
const infoToProjection = require('infotoprojection')

function addTypes (schema) {
  schema.owner = {
    type: String,
    required: true
  }
  schema.isDeleted = {
    type: Boolean,
    default: false
  }
}

function secureUpdatePlugin (schema) {
  schema.index({ owner: 1 })

  schema.statics.secureUpdate = async function (owner, { _id, ...obj }, info) {
    const updated = await this.findOneAndUpdate({ _id, owner }, obj, {
      new: true,
      projection: infoToProjection(info)
    })
    if (!updated) throw new Error(NOT_FOUND)
    return updated
  }

  schema.statics.findById = function (_id, info) {
    return this.findOne({ _id }, infoToProjection(info))
  }

  schema.statics.secureRemove = async function (owner, _id, info) {
    const deleted = await this.findOneAndUpdate({ _id, owner }, { isDeleted: true }, { new: true, projection: infoToProjection(info) })
    if (!deleted) throw new Error(NOT_FOUND)
    return deleted
  }

  schema.statics.secureFind = async function (owner, _id) {
    const res = await this.findOne({ _id, owner })
    if (!res) throw new Error(NOT_FOUND)
    return res
  }

  schema.statics.findByOwner = async function (owner, info) {
    const res = await this.find({ owner }, infoToProjection(info))
    if (!res) throw new Error(NOT_FOUND)
    return res
  }

  schema.statics.exists = async function (_id) {
    const res = await this.findOne({ _id }, { _id })
    if (!res) throw new Error(NOT_FOUND)
    return res
  }
}

module.exports = { addTypes, secureUpdatePlugin }
