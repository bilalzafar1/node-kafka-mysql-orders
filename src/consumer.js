const { Kafka } = require('kafkajs');
const { createDbConnection } = require('./db');

const kafka = new Kafka({
  clientId: 'order-consumer',
  brokers: ['localhost:9092']
});

async function runConsumer() {
  const consumer = kafka.consumer({ groupId: 'order-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-placed', fromBeginning: true });

  const db = await createDbConnection();

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      console.log('Received order from Kafka:', order);

      try {
        await db.execute(
          'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [order.userId, order.productId, order.quantity]
        );
        console.log('Order inserted into MySQL');
      } catch (err) {
        console.error('Error inserting into MySQL:', err);
      }
    },
  });
}

module.exports = { runConsumer };