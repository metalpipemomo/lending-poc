// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
import mongoose from 'mongoose';
import { SchemaToType, Mutable } from './utils';

const MatchSchema = mongoose.Schema; // function to create a schema

const schemaDefinition = {
  loanerId: { // Id of the user who created the loan offer in db
    type: "String",
    required: true
  },
  borrowerId:{ // Id of the user who requested matching details of and successfully matched to the loan offer in the db
    type: "String",
    required: true
  },
  loanId:{ // Id of the loan offer in db
    type: "ObjectId",
    required: true
  },
  borrowId:{ // Id of the borrow offer in db
    type: "ObjectId",
    required: true
  },
  status: { // status of the match: pending, accepted, rejected
    type: "String",
    required: true
  }
} as const;

// We can use it to make a schema to enforce like so.
const matchSchema = new MatchSchema(schemaDefinition)

export type Match = Mutable<SchemaToType<typeof schemaDefinition>>;

// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
export const MatchModel = mongoose.model('Match', matchSchema, 'matches');