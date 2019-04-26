const { TURNED_OFF, TURNED_ON } = require('../subscriptions/channels');

exports.resolver = {
  Mutation: {
    turnOn: async (_, { relay }, { mqtt, pubsub }) => {
      await mqtt.publish('/turnOn', relay.toString());
      await pubsub.publish(TURNED_ON, { turnedOn: relay });
      return true;
    },
    turnOff: async (_, { relay }, { mqtt, pubsub }) => {
      await mqtt.publish('/turnOff', relay.toString());
      await pubsub.publish(TURNED_OFF, { turnedOff: relay });
      return true;
    }
  },
  Query: {
    status: async (_, args, { mqtt }) => {
      await mqtt.publish('/status');
      return true;
    }
  }
};
