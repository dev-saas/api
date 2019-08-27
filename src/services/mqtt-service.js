const mqtt = require('mqtt')

const client = mqtt.connect(process.env.CLOUDMQTT_URL)

module.exports = client
