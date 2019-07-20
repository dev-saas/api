exports.resolver = {
  Booking: {
    event: ({ event }, _, { services }, info) =>
      services.event.load(event, info),

    user: ({ user }, _, { services }, info) =>
      services.user.load(user, info)
  },
  Query: {
    getBookings: (_, { page }, { services }, info) =>
      services.booking.pages.get(page, info)
  },
  Mutation: {
    bookEvent: async (_, { eventId }, { user, services }) =>
      services.Booking.bookEvent(user, eventId),

    cancelBooking: async (_, { bookingId }, { user, services }, info) =>
      services.Booking.cancel(user, bookingId, info)
  }
}
