const { mutationFollow } = require('./queries')

describe('An registered user', () => {
  it('should follow other user', () => {
    mutationFollow.variables = {
      uid: 2
    }
    return global.request()
      .set('token', global.token.user1)
      .send(mutationFollow)
      .expect(200)
      .expect(res => {
        expect(res.body.data.follow).toBe(true)
      })
  })

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
})
