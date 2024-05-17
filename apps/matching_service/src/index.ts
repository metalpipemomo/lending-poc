// Used from dotenv package to use env variables
// MUST DEFINE MONGO_URI and PORT variables in a .env file in this server directory
import "dotenv/config"
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import readline from 'readline';

import { findMatches } from './util/findMatches';

// import loanRoutes from './routes/matches';


const app = express();
const port = process.env.PORT || 4041;

// Request configuration middleware
app.use(express.json());
app.use(cors());


/** Define custom middlewares here */

// Simple request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method);
    next();
});

/** Set routes here */

// Loan route
// app.use('/api/loan-service', loanRoutes);


// DB connection with connection string and use the options as second arg
mongoose.connect(process.env.MONGO_URI!, { dbName: 'Loans' })
    .then(() => {
        app.listen(port, () => {
            console.log("Express server is running and connected to MongoDB on port " + port);

            // Create a readline interface for user input
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            // Wait for user input to create matches
            rl.question('Hit Enter to create matches...', async () => {
                rl.close();
                try {
                    await findMatches();
                    console.log('Matching complete');
                } catch (error) {
                    console.error('Error during matching:', error);
                } finally {
                    process.exit(0); // Exit the process
                }
            });
        });
    })
    .catch((error) => {
        console.log(error);
    });