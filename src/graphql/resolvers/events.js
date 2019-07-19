const { pagination } = require('../mongodb-utils')

exports.resolver = {
  Event: {
    creator: ({ creator }, _, ctx, info) =>
      ctx.dataloaders.userLoader(info).load(creator.toString())
  },
  Query: {
    getEvents: async (_, { page }, ctx, info) =>
      pagination(ctx.connection.collection('events'), page, info)
  },
  Mutation: {
    createEvent: async (_, { eventInput }, ctx) =>
      ctx.services.Event.create(eventInput, ctx),

    updateEvent: async (_, { input }, ctx, info) =>
      ctx.services.Event.update(input, ctx, info)
  }
}
