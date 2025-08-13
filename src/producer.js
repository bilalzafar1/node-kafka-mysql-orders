const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function publishOrder(order) {
  await producer.connect();
  await producer.send({
    topic: 'order-placed',
    messages: [{ value: JSON.stringify(order) }]
  });
  await producer.disconnect();
  console.log('Order published to Kafka:', order);
}

module.exports = { publishOrder };