exports.resolver = {
  Event: {
    owner: ({ owner }, _, { controllers }, info) =>
      controllers.user.load(owner, info)
  },
  EventsConnection: {
    edges: ({ edges }, _, { controllers }, info) =>
      controllers.event.loadMany(edges, info)
  },
  Query: {
    getEvents: async (_, { page }, { controllers }, info) =>
      controllers.event.getPage(page, info)
  },
  Mutation: {
    createEvent: async (_, { eventInput }, { user, controllers }) =>
      controllers.event.create(user, eventInput),

    updateEvent: async (_, { event }, { user, controllers }, info) =>
      controllers.event.update(user, event, info)
  }
}
