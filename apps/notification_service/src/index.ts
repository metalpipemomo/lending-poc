import nodemailer from 'nodemailer';
import { Kafka } from 'kafkajs';

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

                if (data && data.firstName && data.email && data.amount && data.rate && data.term) {
                    const subject = 'Lendr Matches Found!';
                    const html = `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; margin: 10px;">
                            <h2>Hello ${data.firstName},</h2>
                            <p>We are excited to inform you that we have found some matched offers for you at Lendr! Here are the details of the matched offer:</p>
                            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px;">Detail</th>
                                    <th style="border: 1px solid #ddd; padding: 8px;">Value</th>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">Amount</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${data.amount}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">Rate</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${data.rate}%</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">Term</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${data.term} months</td>
                                </tr>
                            </table>
                            <p>Please <a href="lending-poc-web.vercel.app">visit our website</a> to review the details and proceed further.</p>
                            <p>Best regards,<br/>The Lendr Team</p>
                        </div>
                    `;
                    await sendEmail(data.email, subject, html);
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
