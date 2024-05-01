// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
const mongooseMatchImport = require('mongoose');

const MatchSchema = mongooseMatchImport.Schema; // function to create a schema

// We can use it to make a schema to enforce like so.
const matchSchema = new MatchSchema({
  _id: { // Auto generated Match ID doubles as unique identifier for token
    type: mongooseMatchImport.Types.ObjectId,
    required: true
  },
  loanerId: { // Id of the user who created the loan offer in db
    type: String,
    required: true
  },
  borrowerId:{ // Id of the user who requested matching details of and successfully matched to the loan offer in the db
    type: String,
    required: true
  },
  offerId:{ // Id of the loan offer in db
    type: String,
    required: true
  },
  status: { // Unsure what this represents, risk? Eligibility?
    type: String,
    required: true
  }
})

// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
module.exports = mongooseLoanImport.model('Match', matchSchema, 'matches');