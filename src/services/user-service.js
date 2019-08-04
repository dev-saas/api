const { DataloaderUID } = require('../graphql/mongodb-utils')

const UserService = db => {
  const { User } = db.models

  const load = (id, info) =>
    DataloaderUID(User)
      .Loader(info)
      .load(id.toString())

  return { load }
}

module.exports = UserService
