// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
const mongooseLoanImport = require('mongoose');

const LoanSchema = mongooseLoanImport.Schema; // function to create a schema

// We can use it to make a schema to enforce like so.
const loanSchema = new LoanSchema({
  _id: { // Data entry ID
    type: mongooseLoanImport.Types.ObjectId,
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
  dueDate: {
    type: Date,
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
  isLoan: {
    type: String,
    required: true
  },
  riskCategory: { // "low-risk" "high-risk" "black-listed" 
    type: String,
    required: true
  },
  expiryDate: { // Optional incase they want to leave up indefinitely?
    type: Date,
    required: false
  }
}) // can specify timestamping as second arg in schema

// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
module.exports = mongooseLoanImport.model('Loan', loanSchema, 'loans');