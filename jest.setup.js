if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: `${process.cwd()}/.env.local.test` })
}

const {
  mongo: {
    connection,
    models: {
      User
    }
  },
  mqtt,
  pubsub
} = require('./src/services')

let app = require('./src/app')

beforeAll(() => {
  app = app.listen()
  return app
})

beforeEach(async () => {
  await User.create({ email: 'test@test.com', username: 'test', uid: '1' })
  return User.create({ email: 'test2@test.com', username: 'test2', uid: '2' })
})

afterEach(() => connection.db.dropDatabase())

afterAll(async () => {
  await pubsub.close()
  await app.close()
  await mqtt.end()
  return connection.close()
})
