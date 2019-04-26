var mqtt = require('mqtt');
var pubsub = require('./pubsub');

var {
  NEW_TEMPERATURE,
  NEW_HUMIDITY,
  RELAY_1,
  RELAY_2
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

client.subscribe('rele1', function() {
  client.on('message', async function(topic, msg, pkt) {
    if (topic !== 'rele1') return;
    let isOn = JSON.parse(msg);
    pubsub.publish(RELAY_1, { relay1: isOn });
  });
});
client.subscribe('rele2', function() {
  client.on('message', async function(topic, msg, pkt) {
    if (topic !== 'rele2') return;
    let isOn = JSON.parse(msg);
    pubsub.publish(RELAY_2, { relay2: isOn });
  });
});

module.exports = client;
