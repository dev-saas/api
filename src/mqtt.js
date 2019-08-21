const mqtt = require('mqtt')
const pubsub = require('./pubsub')
const debug = require('debug')('mqtt')

const { NEW_VALUE } = require('./graphql/subscriptions/channels')

const client = mqtt.connect(process.env.CLOUDMQTT_URL)

client.on('connect', () => {
  client.subscribe('temperature')
  client.subscribe('humidity')
  client.subscribe('turnedOn')
  client.subscribe('turnedOff')
  client.subscribe('light')
  client.subscribe('moisture')
  client.subscribe('report')
})

client.on('message', function (topic, msg, pkt) {
  try {
    const value = JSON.parse(msg)
    switch (topic) {
      case 'turnedOn':
        pubsub.publish(NEW_VALUE, {
          newValue: { name: `relay${value}`, value: true }
        })
        break
      case 'turnedOff':
        pubsub.publish(NEW_VALUE, {
          newValue: { name: `relay${value}`, value: false }
        })
        break
      case 'report':
        Object.entries(value).map(entry =>
          pubsub.publish(NEW_VALUE, {
            newValue: { name: entry[0], value: entry[1] }
          })
        )
        break
      default:
        pubsub.publish(NEW_VALUE, {
          newValue: { name: topic, value }
        })
        break
    }
  } catch (err) {
    debug(err)
  }
})

module.exports = client
