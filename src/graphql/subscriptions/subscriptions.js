const {
  NEW_EVENT,
  UPDATED_EVENT,
  TURNED_OFF,
  TURNED_ON,
  NEW_VALUE
} = require('./channels');

exports.resolver = {
  Subscription: {
    newEvent: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(NEW_EVENT)
    },
    updatedEvent: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(UPDATED_EVENT)
    },
    turnedOn: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(TURNED_ON)
    },
    turnedOff: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(TURNED_OFF)
    },
    newValue: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(NEW_VALUE)
    }
  }
};
