exports.resolver = {
  Event: {
    creator: ({ creator }, _, { services }, info) =>
      services.user.load(creator, info)
  },
  Query: {
    getEvents: async (_, { page }, { services }, info) =>
      services.event.pages.get(page, info)
  },
  Mutation: {
    createEvent: async (_, { eventInput }, { user, services }) =>
      services.event.create(user, eventInput),

    updateEvent: async (_, { event }, { user, services }, info) =>
      services.event.update(user, event, info)
  }
}
