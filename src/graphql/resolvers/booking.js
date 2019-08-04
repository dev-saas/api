exports.resolver = {
  Booking: {
    event: ({ event }, _, { services }, info) =>
      services.event.load(event, info),

    user: ({ user }, _, { services }, info) =>
      services.user.load(user, info)
  },
  Query: {
    getBookings: (_, { page }, { user, services }, info) =>
      services.booking.pages.get(page, info, { user: user.id })
  },
  Mutation: {
    bookEvent: async (_, { eventId }, { user, services }) =>
      services.booking.bookEvent(user, eventId),

    cancelBooking: async (_, { bookingId }, { user, services }, info) =>
      services.booking.cancel(user, bookingId, info)
  }
}
