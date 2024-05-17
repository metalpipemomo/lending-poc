// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
import mongoose from 'mongoose';
import { SchemaToType, Mutable } from './utils';

const LoanSchema = mongoose.Schema; // function to create a schema

const schemaDefinition = {
  userId: { // Requesting user's ID
    type: "String",
    required: true
  },
  loanAmount: { // The amount being offered or requested by a lender or borrower
    type: "Number",
    required: true
  },
  interestRate: { // The rate at which the borrower incurs interest on the loan amount
    type: "Number",
    required: true
  },
  dueDate: { // The date the loan must be paid back by
    type: "Date",
    required: true
  },
  dateOfIssue: { // The date of this entry being entered to DB
    type: "Date",
    required: true
  },
  loanTerm: { // A number in months
    type: "Number",
    required: true
  },
  numberOfInstallments: { // How many installments the loanAmount can be split into
    type: "Number",
    required: true
  },
  isLoan: { // TRUE means this is a loan, meaning it is entered by a lender, FALSE meaning this is not a loan but a request from a borrower
    type: "String",
    required: true
  },
  riskLevel: { // "low, medium, high"
    type: "String",
    required: true
  },
  expiryDate: { // Optional incase they want to leave up indefinitely?
    type: "Date",
    required: false
  }
} as const;

// We can use it to make a schema to enforce like so.
const loanSchema = new LoanSchema(schemaDefinition); // can specify timestamping as second arg in schema

export type Loan = Mutable<SchemaToType<typeof schemaDefinition>>;

// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
export const LoanModel = mongoose.model('Loan', loanSchema, 'loans');