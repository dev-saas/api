const ObjectId = require('mongodb').ObjectID

exports.resolver = {
  Query: {
    myEvents: (_, { page }, { user, services }, info) =>
      services.event.pages.get(page, info, {
        creator: ObjectId(user.id)
      })
  }
}
