// // Used from dotenv package to use env variables
// // MUST DEFINE MONGO_URI and PORT variables in a .env file in this server directory
// import "dotenv/config"
// import express, { Request, Response, NextFunction } from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';

// import loanRoutes from './routes/matches';


// const app = express();
// const port = process.env.PORT || 4041;

// // Request configuration middleware
// app.use(express.json()); 
// app.use(cors());


// /** Define custom middlewares here */

// // Simple request logging middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(req.path, req.method);
//   next();
// });

// /** Set routes here */

// // Loan route
// app.use('/api/loan-service', loanRoutes);


// // DB connection with connection string and use the options as second arg
// mongoose.connect(process.env.MONGO_URI!, { dbName: 'Loans' }) // async returns a promise so use .then to fire a method when complete and .catch method for errors
//   .then(()=>{
//     // Don't want to accept requests until we have connected, so put the listener here.
//     // listen for requests on a certain port number
//     app.listen(port, () =>{
//       console.log("Express server is running and connected to MongoDB on port " + port);
//     });
//   })
//   .catch((error)=>{console.log(error)})