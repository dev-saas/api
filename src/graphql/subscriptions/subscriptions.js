const {
  NEW_EVENT,
  UPDATED_EVENT,
  NEW_HUMIDITY,
  NEW_TEMPERATURE,
  RELAY_1,
  RELAY_2
} = require('./channels');

exports.resolver = {
  Subscription: {
    newEvent: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(NEW_EVENT)
    },
    updatedEvent: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(UPDATED_EVENT)
    },
    newTemperature: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(NEW_TEMPERATURE)
    },
    newHumidity: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(NEW_HUMIDITY)
    },
    relay1: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(RELAY_1)
    },
    relay2: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(RELAY_2)
    }
  }
};
