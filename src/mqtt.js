var mqtt = require('mqtt');
var pubsub = require('./pubsub');

var {
  NEW_TEMPERATURE,
  NEW_HUMIDITY,
  TURNED_OFF,
  TURNED_ON
} = require('./graphql/subscriptions/channels');

var client = mqtt.connect(process.env.CLOUDMQTT_URL);

client.subscribe('temperatura', function() {
  client.on('message', async function(topic, msg, pkt) {
    if (topic !== 'temperatura') return;
    let temperatura = JSON.parse(msg);
    pubsub.publish(NEW_TEMPERATURE, { newTemperature: temperatura });
  });
});

client.subscribe('umidade', function() {
  client.on('message', async function(topic, msg, pkt) {
    if (topic !== 'umidade') return;
    let umidade = JSON.parse(msg);
    pubsub.publish(NEW_HUMIDITY, { newHumidity: umidade });
  });
});

client.subscribe('turnedOn', function() {
  client.on('message', async function(topic, msg, pkt) {
    if (topic !== 'turnedOn') return;
    let relay = JSON.parse(msg);
    pubsub.publish(TURNED_ON, { turnedOn: relay });
  });
});
client.subscribe('turnedOff', function() {
  client.on('message', async function(topic, msg, pkt) {
    if (topic !== 'turnedOff') return;
    let relay = JSON.parse(msg);
    pubsub.publish(TURNED_OFF, { turnedOff: relay });
  });
});

module.exports = client;
