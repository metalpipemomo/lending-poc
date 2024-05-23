// Used from dotenv package to use env variables
// MUST DEFINE MONGO_URI and PORT variables in a .env file in this server directory
import "dotenv/config"
import mongoose from 'mongoose';
import readline from 'readline';
import { findMatches } from './util/findMatches';

// DB connection with connection string and use the options as second arg
mongoose.connect(process.env.MONGO_URI!, { dbName: 'Loans' })
    .then(() => {
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
    })
    .catch ((error) => {
    console.log(error);
});