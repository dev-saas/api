module.exports = ({ models: { Follow, User } }) => {
  return {
    followers: (uid, page) => Follow.getPage(page, { following: uid }, 'owner'),

    following: (uid, page) => Follow.getPage(page, { owner: uid }, 'following'),

    unfollow: (owner, following) => Follow.findOneAndRemove({ owner, following }),

    isFollower: async (owner, following) => {
      const isFollowing = await Follow.findOne({
        owner,
        following,
        status: 'ACCEPTED'
      })
      return !!isFollowing
    },

    follow: async (owner, following) => {
      if (owner == following) return false
      const isPrivate = await User.isPrivate({ uid: following })
      const res = await Follow.create({
        owner,
        following,
        status: isPrivate ? 'PENDING' : 'ACCEPTED'
      })
      return !!res
    }
  }
}
