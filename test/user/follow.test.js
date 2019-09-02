const { mutationFollow, mutationUnfollow } = require('./queries')

describe('An registered user', () => {
  it('should not follow itself', () => {
    mutationFollow.variables = {
      uid: 1
    }
    return global.request()
      .set('token', global.token.user1)
      .send(mutationFollow)
      .expect(200)
      .expect(res => {
        expect(res.body.data.follow).toBe(false)
      })
  })

  it('should follow other user', () => {
    mutationFollow.variables = {
      uid: 1
    }
    return global.request()
      .set('token', global.token.user2)
      .send(mutationFollow)
      .expect(200)
      .expect(res => {
        expect(res.body.data.follow).toBe(true)
      })
  })

  it('should unfollow other user', () => {
    mutationUnfollow.variables = {
      uid: 2
    }
    return global.request()
      .set('token', global.token.user1)
      .send(mutationUnfollow)
      .expect(200)
      .expect(res => {
        expect(res.body.data.unfollow).toBe(true)
      })
  })

  it('should unfollow other user', () => {
    mutationUnfollow.variables = {
      uid: 1
    }
    return global.request()
      .set('token', global.token.user2)
      .send(mutationUnfollow)
      .expect(200)
      .expect(res => {
        expect(res.body.data.unfollow).toBe(false)
      })
  })

  it('should not unfollow itself', () => {
    mutationUnfollow.variables = {
      uid: 1
    }
    return global.request()
      .set('token', global.token.user1)
      .send(mutationUnfollow)
      .expect(200)
      .expect(res => {
        expect(res.body.data.unfollow).toBe(false)
      })
  })
})
