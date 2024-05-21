import rateLimiter from './rate-limiter';
import request from 'supertest';
import express, { Request, Response } from 'express';

const app = express();
const numReqs = 10;
const windowMins = 1;

app.use(rateLimiter({
    windowMs: windowMins * 60 * 1000,
    maxReqs: numReqs
}));

app.get('/', (req: Request, res: Response) => res.status(200).send('OK'));

describe('Rate Limiter Middleware', () => {
    it(`should allow up to ${numReqs} requests from a user and block any further attempts within ${windowMins} minute(s)`, async () => {
        const agent = request(app);

        for (let i = 0; i < numReqs; i++) {
            const response = await agent.get('/');
            expect(response.status).toBe(200);
        }
        
        const response = await agent.get('/');
        expect(response.status).toBe(429);
        expect(response.text).toBe('Rate Limit exceeded, please try again later.');
    });
});