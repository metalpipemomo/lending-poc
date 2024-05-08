// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
import mongoose from 'mongoose';

const MatchSchema = mongoose.Schema; // function to create a schema

// We can use it to make a schema to enforce like so.
const matchSchema = new MatchSchema({
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
export default mongoose.model('Match', matchSchema, 'matches');