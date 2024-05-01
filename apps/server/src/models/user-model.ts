// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
const mongooseUserImport = require('mongoose');

const UserSchema = mongooseUserImport.Schema; // function to create a schema

// We can use it to make a schema to enforce like so.
const userSchema = new UserSchema({
  _id: { // Auto generated ID doubles as unique identifier for token
    type: mongooseUserImport.Types.ObjectId,
    required: true
  },
  userId: { // Is it going to be same as auto gen id?
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  creditScore: {
    type: Number,
    required: true
  }
})

// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
module.exports = mongooseLoanImport.model('User', userSchema, 'users');