const { Schema, model } = require('mongoose')
const { USER_REGISTERED, NOT_FOUND } = require('../graphql/error')
const { infoToProjection } = require('./utils/mongodb-utils')
const { dataloaderPlugin, paginationPlugin } = require('./plugins')

const schema = {
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  private: {
    type: Boolean,
    default: false
  }
}

const userSchema = new Schema(schema, { timestamps: true })

userSchema.index({ username: 'text' })

userSchema.statics.register = async function (uid, email) {
  try {
    const existingUser = await this.findOne({ $or: [{ uid }, { email }] })
    if (existingUser) {
      throw new Error(USER_REGISTERED)
    }
    return this.create({ uid, email })
  } catch (err) {
    throw err
  }
}

userSchema.statics.update = async function (uid, user, info) {
  try {
    const updatedUser = await this.findOneAndUpdate({ uid }, user, {
      new: true,
      projection: infoToProjection(info)
    })
    if (!updatedUser) {
      throw new Error(NOT_FOUND)
    }
    return updatedUser
  } catch (err) {
    throw err
  }
}

userSchema.statics.isPrivate = async function (params) {
  const user = await this.findOne(params, { private: 1 })
  if (!user) throw new Error(NOT_FOUND)
  return user.private
}

userSchema.statics.findByUID = function (uid, info, params) {
  return this.findOne({ uid }, params || infoToProjection(info))
}

userSchema.statics.findByUsername = function (username, info) {
  return this.findOne({ username }, infoToProjection(info))
}

userSchema.plugin(dataloaderPlugin)
userSchema.plugin(paginationPlugin)

module.exports = model('User', userSchema)
