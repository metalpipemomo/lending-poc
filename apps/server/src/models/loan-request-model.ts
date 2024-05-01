// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
const mongooseLoanRequestImport = require('mongoose');

const LoanRequestSchema = mongooseLoanRequestImport.Schema; // function to create a schema

// We can use it to make a schema to enforce like so.
const loanRequestSchema = new LoanRequestSchema({
  _id: { // Loan Request ID
    type: mongooseLoanRequestImport.Types.ObjectId,
    required: true
  },
  userId: { // Requesting user ID
    type: String,
    required: true
  },
  loanAmount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  dateOfIssue: {
    type: Date,
    Required: true
  },
  loanTerm: { // A number in months
    type: Number,
    required: true
  },
  numberOfInstallments: {
    type: Number,
    required: true
  },
  riskCategory: { // "low-risk" < "high-risk" < "black-listed" 
    type: String,
    required: true
  },
  expiryDate: { // Optional incase they want to leave up indefinitely?
    type: Date,
    required: false
  }
}) // can specify timestamping as second arg


// Creates a model based on schema to be used for interactions with DB collection of that name.
module.exports = mongooseLoanRequestImport.model('LoanRequest', loanRequestSchema, 'loan-requests');