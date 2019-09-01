const { mutationUpdate } = require('./queries')

describe('An registered user', () => {
  it('should update its profile', () => {
    mutationUpdate.variables = {
      user: {
        username: 'ttt'
      }
    }
    return global.request()
      .set('token', global.token.user1)
      .send(mutationUpdate)
      .expect(200)
      .expect(res => {
        expect(res.body.data.updateUser.username).toBe('ttt')
      })
  })
})
