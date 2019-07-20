exports.resolver = {
  Mutation: {
    turnOn: async (_, { relay }, { mqtt }) => {
      await mqtt.publish('/turnOn', relay.toString())
      return true
    },
    turnOff: async (_, { relay }, { mqtt }) => {
      await mqtt.publish('/turnOff', relay.toString())
      return true
    }
  },
  Query: {
    status: async (_, args, { mqtt }) => {
      await mqtt.publish('/status')
      return true
    }
  }
}
