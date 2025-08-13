const express = require('express');
const bodyParser = require('body-parser');
const { publishOrder } = require('./producer');
const { runConsumer } = require('./consumer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// API Endpoint: POST /orders to create and publish an order
app.post('/orders', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const order = { userId, productId, quantity };
  try {
    await publishOrder(order);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('Error publishing order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Start the server and run the consumer in the background
app.listen(port, async () => {
  console.log(`API server running on http://localhost:${port}`);
  try {
    await runConsumer();
    console.log('Kafka consumer started');
  } catch (err) {
    console.error('Error starting consumer:', err);
  }
});