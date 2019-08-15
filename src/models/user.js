const mongoose = require('mongoose')
const { USER_REGISTERED } = require('../graphql/error')
const Schema = mongoose.Schema

const userSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

userSchema.statics.register = async function(uid, email) {
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

userSchema.plugin(require('./plugins/dataloaderPlugin'), { uid: true })

module.exports = mongoose.model('User', userSchema)
