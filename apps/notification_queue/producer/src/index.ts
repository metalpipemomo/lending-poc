import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

const produce = async () => {
  await producer.connect();
  
  for (let i = 0; i < 5; i++) {
    const message = `Message at ${new Date().toISOString()}`;
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: message },
      ],
    });
    console.log('Produced:', message);
  }

  await producer.disconnect();
};

produce().catch(console.error);
