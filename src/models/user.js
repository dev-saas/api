const mongoose = require('mongoose')

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
    const existingUser = await this.findOne({ uid })
    if (existingUser) {
      throw new Error('User exists already.')
    }
    return this.create({ uid, email })
  } catch (err) {
    throw err
  }
}

module.exports = mongoose.model('User', userSchema)
