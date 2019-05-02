const { NEW_EVENT, UPDATED_EVENT, NEW_VALUE } = require('./channels')

exports.resolver = {
  Subscription: {
    newEvent: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(NEW_EVENT)
    },
    updatedEvent: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(UPDATED_EVENT)
    },
    newValue: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(NEW_VALUE)
    }
  }
}
