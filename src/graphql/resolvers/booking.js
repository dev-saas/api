const { pagination } = require('../mongodb-utils')

exports.resolver = {
  Booking: {
    event: ({ event }, _, ctx, info) =>
      ctx.dataloaders.eventLoader(info).load(event.toString()),

    user: ({ user }, _, ctx, info) =>
      ctx.dataloaders.userLoader(info).load(user.toString())
  },
  Query: {
    getBookings: (_, { page }, ctx, info) =>
      pagination(ctx.connection.collection('bookings'), page, info)
  },
  Mutation: {
    bookEvent: async (_, { eventId }, ctx) =>
      ctx.services.Booking.bookEvent(eventId, ctx),

    cancelBooking: async (_, { bookingId }, ctx, info) =>
      ctx.services.Booking.cancel(bookingId, ctx, info)
  }
}
