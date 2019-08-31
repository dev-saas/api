const { NEW_POST, UPDATED_POST } = require('../graphql/channels')

module.exports = ({ models: { Post, User }, pubsub }) => {
  return {
    findById: (_id, info) => Post.findById(_id, info),

    findByUserID: async (_id, page, info) => {
      let { uid } = await User.findOne({ _id }, { uid: 1 })
      return Post.getPage(page, { owner: uid })
    },

    newSubscription: () => pubsub.asyncIterator(NEW_POST),

    updateSubscription: () => pubsub.asyncIterator(UPDATED_POST),

    update: async (user, event, info) => {
      const updatedPost = await Post.secureUpdate(user, event, info)
      pubsub.publish(UPDATED_POST, { updatedPost })
      return updatedPost
    },

    create: async (uid, post) => {
      post.owner = uid
      post.private = await User.isPrivate({ uid })
      const createdPost = await Post.create(post)
      pubsub.publish(NEW_POST, { newPost: createdPost })
      return createdPost
    },

    remove: (userId, id) => Post.secureRemove(userId, id)
  }
}
