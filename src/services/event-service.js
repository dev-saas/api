const { infoToProjection } = require('../graphql/mongodb-utils')
const {
  NEW_EVENT,
  UPDATED_EVENT
} = require('../graphql/subscriptions/channels')
module.exports = {
  create: async (event, { user, models: { Event }, pubsub }, info) => {
    const { title, description, price, date } = event
    try {
      const createdEvent = await Event.create({
        title: title,
        description: description,
        price: +price,
        date: date,
        creator: user.id
      })
      pubsub.publish(NEW_EVENT, { newEvent: createdEvent })
      return createdEvent
    } catch (err) {
      throw err
    }
  },
  update: async (input, { user, models: { Event }, pubsub }, info) => {
    const event = await Event.findOneAndUpdate(
      { _id: input._id, creator: user.id },
      input.event,
      { new: true, projection: infoToProjection(info) }
    )
    pubsub.publish(UPDATED_EVENT, { updatedEvent: event })
    return event
  },
  get: async ({ models: { Event } }, info) =>
    Event.find({}, infoToProjection(info))
}
