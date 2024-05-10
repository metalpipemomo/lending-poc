// Used from dotenv package to use env variables
// MUST DEFINE MONGO_URI and PORT variables in a .env file in this server directory
import { config } from 'dotenv';


import express from 'express'; // syntax for importing in es6 if a library doesnt have default export
import * as cors from 'cors';
import mongooseIndexImport from 'mongoose';

import loanRoutes from './routes/loans';
import matchRoutes from './routes/matches';

// Need to run to apply dotenv variables I think
config();
// start up the express app
const app = express();

app.use(cors());

// Register some middleware

// check for body in middle ware request step
// can only access request body from middle ware using express JSON
app.use(express.json()); // parses body and attaches it to req body in next requests

// next must be invoked for switching to next piece of middleware
// Middle ware executes between request and response between client/server
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Grabs the diff routes on our router and uses them on the app at the specified endpoint, see routes folder
app.use('/api/loan-service', loanRoutes);
app.use('/api/loan-service', matchRoutes);

// Specify the DB to access
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Loans', // Specify the database name here in options
}

// DB connection with connection string and use the options as second arg
mongooseIndexImport.connect(process.env.MONGO_URI, connectionOptions) // async returns a promise so use .then to fire a method when complete and .catch method for errors
  .then(()=>{
    // Don't want to accept requests until we have connected, so put the listener here.
    // listen for requests on a certain port number
    app.listen(process.env.PORT, () =>{
      console.log("Express server is running and connected to MongoDB on port " + process.env.PORT);
    });
  })
  .catch((error)=>{console.log(error)})