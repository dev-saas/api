const mqtt = require('mqtt');
const pubsub = require('./pubsub');

const {
  TURNED_OFF,
  TURNED_ON,
  NEW_VALUE
} = require('./graphql/subscriptions/channels');

const client = mqtt.connect(process.env.CLOUDMQTT_URL);

client.on('connect', () => {
  client.subscribe('temperatura');
  client.subscribe('umidade');
  client.subscribe('turnedOn');
  client.subscribe('turnedOff');
  client.subscribe('luminosidade');
  client.subscribe('moisture');
});

client.on('message', function(topic, msg, pkt) {
  const value = JSON.parse(msg);
  switch (topic) {
    case 'turnedOn':
      pubsub.publish(TURNED_ON, { turnedOn: value });
      break;
    case 'turnedOff':
      pubsub.publish(TURNED_OFF, { turnedOff: value });
      break;
    default:
      pubsub.publish(NEW_VALUE, {
        newValue: { name: topic, value }
      });
      break;
  }
});

module.exports = client;
