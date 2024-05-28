import nodemailer from 'nodemailer';
import { Kafka, EachMessagePayload } from 'kafkajs';

// Define the message type
type MessageData = {
    firstName: string,
    email: string,
    amount: number,
    rate: number,
    term: number
}

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'lending.poc.dev@gmail.com',
        pass: 'bsox kqdg wphi vbmy', // app password
    },
});

const sendEmail = async (to: string, subject: string, html: string) => {
    const mailOptions = {
        from: 'noreply <lending.poc.dev@gmail.com>',
        to: to,
        subject: subject,
        html: html,
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

const messageMap = new Map<string, MessageData[]>();
const messageQueue: MessageData[] = [];
let isProcessing = false;

const processMessages = async () => {
    if (isProcessing) return;
    isProcessing = true;

    for (const [email, messages] of messageMap.entries()) {
        if (messages.length > 0) {
            const subject = 'Lendr Matches Found!';
            const html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; margin: 10px; color: #333;">
                    <h2 style="color: #0066ae;">Hello ${messages[0].firstName},</h2>
                    <p>We are excited to inform you that we have found some matched offers for you at Lendr! Here are the details of the matched offers:</p>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
                        <thead>
                            <tr style="background-color: #fff;">
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Amount</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Rate</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Term</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${messages.map((data, index) => `
                            <tr style="background-color: ${index % 2 === 0 ? '#f9f9f9' : '#fff'};">
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.amount}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.rate}%</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.term} months</td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                    <p>Please <a href="lending-poc-web.vercel.app" style="color: #0066ae;">visit our website</a> to review the details and proceed further.</p>
                    <p>Best regards,<br/>The Lendr Team</p>
                </div>
            `;
            await sendEmail(email, subject, html);
        }
    }
    messageMap.clear();

    // Move messages from the queue back to the map
    while (messageQueue.length > 0) {
        const data = messageQueue.shift();
        if (data) {
            if (!messageMap.has(data.email)) {
                messageMap.set(data.email, []);
            }
            messageMap.get(data.email)?.push(data);
        }
    }

    isProcessing = false;
};

setInterval(processMessages, 30000); // Process messages every 60 seconds

const run = async () => {
    // Connect the consumer
    await consumer.connect();
    console.log('Kafka consumer connected...');

    // Subscribe to the topic
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    // Run the consumer
    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            try {
                const data: MessageData = JSON.parse(message.value?.toString() || '');
                
                if (data && data.firstName && data.email && data.amount && data.rate && data.term) {
                    if (isProcessing) {
                        messageQueue.push(data);
                    } else {
                        if (!messageMap.has(data.email)) {
                            messageMap.set(data.email, []);
                        }
                        messageMap.get(data.email)?.push(data);
                    }
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
