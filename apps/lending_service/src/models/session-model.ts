// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
import mongooseSessionImport from 'mongoose';

const SessionSchema = mongooseSessionImport.Schema; // function to create a schema

// We can use it to make a schema to enforce like so.
const sessionSchema = new SessionSchema({
  userId: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
})

// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
export const Session = mongooseSessionImport.model('Session', sessionSchema, 'sessions');