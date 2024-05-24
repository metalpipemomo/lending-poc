import nodemailer from 'nodemailer';
import { Kafka } from 'kafkajs';

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // you can use other services like 'Yahoo', 'Outlook', etc.
    auth: {
      user: 'lending.poc.dev@gmail.com',
      pass: 'bsox kqdg wphi vbmy', // app password
    },
  });

const sendEmail = async (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: 'lending.poc.dev@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}: ` + info.response);
    } catch (error) {
        console.error(`Error sending email to ${to}: `, error);
    }
};

// Kafka configuration
const kafka = new Kafka({
    clientId: 'notification_service',
    brokers: ['localhost:9093'], 
});

const consumer = kafka.consumer({ groupId: 'email-group' });

const run = async () => {
    // Connect the consumer
    await consumer.connect();
    console.log('Kafka consumer connected...');

    // Subscribe to the topic
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    // Run the consumer
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const data = JSON.parse(message.value?.toString() || '');

                if (data && data.firstName && data.email) {
                    const subject = 'Lendr Matches Found!';
                    const text = `Hello ${data.firstName},\nyou have some matches at Lendr! Head over to the website to check it out.`;
                    await sendEmail(data.email, subject, text);
                } else {
                    console.error('Invalid message format:', message.value);
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        },
    });
};

run().catch(console.error);
