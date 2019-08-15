const {
  NEW_EVENT,
  UPDATED_EVENT
} = require('../graphql/subscriptions/channels')

module.exports = (db, pubsub) => {
  const { Event } = db.models

  const getPage = (page, info) => Event.getPage(page, info)
  const loadMany = (ids, info) => Event.loadMany(ids, info)
  const load = (id, info) => Event.load(id, info)

  const update = async (user, event, info) => {
    const updatedEvent = await Event.secureUpdate(user.id, event, info)
    pubsub.publish(UPDATED_EVENT, { updatedEvent })
    return updatedEvent
  }

  const create = async (user, event) => {
    const { title, description, price, date } = event
    try {
      const createdEvent = await Event.create({
        title: title,
        description: description,
        price: +price,
        date: date,
        owner: user.id
      })
      pubsub.publish(NEW_EVENT, { newEvent: createdEvent })
      return createdEvent
    } catch (err) {
      throw err
    }
  }

  return { update, create, load, loadMany, getPage }
}
