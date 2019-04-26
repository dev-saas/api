const {
  NEW_EVENT,
  UPDATED_EVENT,
  NEW_HUMIDITY,
  NEW_TEMPERATURE,
  TURNED_OFF,
  TURNED_ON
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
    turnedOn: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(TURNED_ON)
    },
    turnedOff: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(TURNED_OFF)
    }
  }
};
