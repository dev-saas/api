const { NEW_NOTIFICATION } = require('../graphql/subscriptions/channels')

module.exports = ({ Notification }, pubsub) => {
  return {
    findByUserUID: (uid, info) => Notification.findByOwner(uid, info),

    newNotification: async (owner, sender, message) => {
      let newNotification = await Notification.create({
        owner,
        sender,
        message
      })
      pubsub.publish(NEW_NOTIFICATION, newNotification)
      return true
    },

    newSubscription: () => pubsub.asyncIterator(NEW_NOTIFICATION)
  }
}
