import { Request, Response, NextFunction } from "express";

type RateLimiterOpts = {
    windowMs: number,
    maxReqs: number,
};

export default function rateLimiter(opts: RateLimiterOpts) {
    const requestCounts: Record<string, number[]> = {};

    return (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;
        const now = Date.now();

        if (!ip) return res.status(409).send('Connection destroyed');
        if (!requestCounts[ip]) {
            requestCounts[ip] = [];
        }

        requestCounts[ip] = requestCounts[ip].filter(timestamp => now - timestamp < opts.windowMs);

        if (requestCounts[ip].length >= opts.maxReqs) {
            res.status(429).send('Rate Limit exceeded, please try again later.');
        } else {
            requestCounts[ip].push(now);
            next();
        }
        
    }
}