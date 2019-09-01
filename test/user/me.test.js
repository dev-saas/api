const { queryMe } = require('./queries')

describe('An registered user', () => {
  it('test should see its own information', () => {
    return global.request()
      .set('token', global.token.user1)
      .send(queryMe)
      .expect(200)
      .expect(res => {
        expect(res.body.data.me.username).toBe('test')
        expect(res.body.data.me.email).toBe('test@test.com')
      })
  })

  it('test2 should see its own information', () => {
    return global.request()
      .set('token', global.token.user2)
      .send(queryMe)
      .expect(200)
      .expect(res => {
        expect(res.body.data.me.username).toBe('test2')
        expect(res.body.data.me.email).toBe('test2@test.com')
      })
  })
})
