# Node.js with Kafka and MySQL: Order Processing App

This project demonstrates a Node.js application using Kafka for event streaming and MySQL for data persistence. It includes:
- An Express API to place orders via HTTP, which publishes events to Kafka.
- A Kafka consumer that listens for events and inserts orders into MySQL.

## Prerequisites
- Node.js (LTS)
- MySQL Server
- Kafka (with ZooKeeper)
- Java JDK 17+

## Setup
1. Clone the repo: `git clone https://github.com/yourusername/node-kafka-mysql-orders.git`
2. Install dependencies: `npm install`
3. Set up MySQL:
   - Create database `order_db` and table `orders` (see SQL in guide).
4. Start Kafka/ZooKeeper (see installation guide in this README or project docs).
5. Update `src/db.js` with your MySQL credentials.

## Running the App
- Start: `npm start`
- API Endpoint: POST `/orders` with JSON body `{ "userId": 1, "productId": 101, "quantity": 2 }`

## Architecture
- **Producer**: API publishes orders to Kafka topic `order-placed`.
- **Consumer**: Listens to topic and saves to MySQL.
- Decouples API from DB for scalability.

## Installation Guides
### MySQL on Windows
- Download from https://dev.mysql.com/downloads/mysql/.
- Install and create DB/table as described.

### Kafka on Windows
1. Install Java JDK.
2. Download Kafka from https://kafka.apache.org/downloads.
3. Extract to `C:\kafka`.
4. Start ZooKeeper: `zookeeper-server-start.bat config\zookeeper.properties`
5. Start Kafka: `kafka-server-start.bat config\server.properties`
6. Create topic: `kafka-topics.bat --create --topic order-placed --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1`

## Dependencies
- express: API framework
- kafkajs: Kafka client
- mysql2: MySQL driver

## Troubleshooting
- Ensure ports 3306 (MySQL), 2181 (ZooKeeper), 9092 (Kafka) are free.
- Check console logs for errors.

## License
MIT