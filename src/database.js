const mongoose = require('mongoose')
const debug = require('debug')
require('./models')

mongoose
  .connect(`${process.env.MONGO_URI}?retryWrites=true`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .catch(err => {
    debug('server:error')(err)
  })

module.exports = {
  connection: mongoose.connection,
  models: mongoose.models
}
