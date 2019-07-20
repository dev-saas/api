const EventService = require('./event-service')
const BookingService = require('./booking-service')
const UserService = require('./user-service')
const AuthService = require('./auth-service')

const services = (db, pubsub, mqtt) => {
  const event = EventService(db, pubsub)
  const booking = BookingService(db)
  const user = UserService(db)
  const auth = AuthService(db)

  return { event, booking, user, auth }
}

module.exports = services
