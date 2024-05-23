import { Kafka } from 'kafkajs';

const kafkaBroker = process.env.KAFKA_BROKER || 'kafka:9092';

const kafka = new Kafka({
  clientId: 'consumer',
  brokers: [kafkaBroker]
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Consumed:', message.value?.toString());
    },
  });
};

consume().catch(console.error);
