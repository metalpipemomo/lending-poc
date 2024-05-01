// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
var mongooseLoanImport = require('mongoose');
var LoanSchema = mongooseLoanImport.Schema; // function to create a schema
// We can use it to make a schema to enforce like so.
var loanSchema = new LoanSchema({
    _id: {
        type: mongooseLoanImport.Types.ObjectId,
        required: true
    },
    userId: {
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
    loanTerm: {
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
    riskLevel: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: false
    }
}); // can specify timestamping as second arg in schema
// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
module.exports = mongooseLoanImport.model('Loan', loanSchema, 'loans');
