const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'USUARIO'
  }
})

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12)
    next()
  } else {
    return next()
  }
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne(
    { email: email },
    { password: 1, role: 1 }
  )
  if (!user) {
    throw new Error('User does not exist!')
  }
  const isEqual = await bcrypt.compare(password, user.password)
  if (!isEqual) {
    throw new Error('Password is incorrect!')
  }
  const token = jwt.sign(
    { id: user.id, email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
  return { token }
}

userSchema.statics.createNew = async function(email, password) {
  try {
    const existingUser = await this.findOne({ email: email }, { _id: 1 })
    if (existingUser) {
      throw new Error('User exists already.')
    }
    return this.create({
      email: email,
      password: password
    })
  } catch (err) {
    throw err
  }
}

module.exports = mongoose.model('User', userSchema)
