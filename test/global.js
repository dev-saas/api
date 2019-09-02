const {
  firebase
} = require('../src/services')
const request = require('supertest')
const app = require('../src/app')

global.token = {}

firebase.auth.createCustomToken('1').then(token => { global.token.user1 = token })

firebase.auth.createCustomToken('2').then(token => { global.token.user2 = token })

global.request = () => request(app).post('/graphql')
