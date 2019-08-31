const { querySearch } = require('./queries')

describe('Anyone', () => {
  it('should search users', () => {
    querySearch.variables = {
      username: 'test'
    }
    return global.request()
      .send(querySearch)
      .expect(200)
      .expect(res => {
        expect(res.body.data.users.hasNextPage).toBe(false)
        expect(res.body.data.users.nodes.length).toBe(2)
      })
  })

  it('should search users', () => {
    querySearch.variables = {
      username: 'test',
      page: {
        size: 1
      }
    }
    return global.request()
      .send(querySearch)
      .expect(200)
      .expect(res => {
        expect(res.body.data.users.hasNextPage).toBe(true)
        expect(res.body.data.users.nodes.length).toBe(1)
      })
  })

  it('should search users', () => {
    querySearch.variables = {
      username: 'test2'
    }
    return global.request()
      .send(querySearch)
      .expect(200)
      .expect(res => {
        expect(res.body.data.users.hasNextPage).toBe(false)
        expect(res.body.data.users.nodes.length).toBe(1)
      })
  })

  it('should search users', () => {
    querySearch.variables = {
      username: 'test21'
    }
    return global.request()
      .send(querySearch)
      .expect(200)
      .expect(res => {
        expect(res.body.data.users.hasNextPage).toBe(false)
        expect(res.body.data.users.nodes.length).toBe(0)
      })
  })
})
