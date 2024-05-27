// Used from dotenv package to use env variables
// MUST DEFINE MONGO_URI and PORT variables in a .env file in this server directory
import "dotenv/config";
import mongoose from 'mongoose';
import { findMatches } from './util/findMatches';

const intervalMinutes = 30;

async function performMatching() {
    try {
        await findMatches();
        console.log('Matching complete');
    } catch (error) {
        console.error('Error during matching:', error);
    }
    console.log(`Next matching occurring in ${intervalMinutes} minutes`);
}

// DB connection with connection string and use the options as second arg
mongoose.connect(process.env.MONGO_URI!, { dbName: 'Loans' })
    .then(() => {
        console.log("Connected to MongoDB");
        performMatching();
        setInterval(performMatching, intervalMinutes * 60 * 1000);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
