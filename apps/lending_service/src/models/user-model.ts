// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
const mongooseUserImport = require('mongoose');

const UserSchema = mongooseUserImport.Schema; // function to create a schema

// We can use it to make a schema to enforce like so.
const userSchema = new UserSchema({
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
  },
  createdLoans: { // Proposing we add this data parameter for user schema as it could provide a better way to retrieve all created loan borrows or offers by ID of a certain user
    type: Array,
    required: false
  }
})

// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
module.exports = mongooseLoanImport.model('User', userSchema, 'users');