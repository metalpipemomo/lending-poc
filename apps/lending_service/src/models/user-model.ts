import mongoose from 'mongoose';
import { SchemaToType, Mutable } from '../utils';

const UserSchema = mongoose.Schema; // function to create a schema

const schemaDefinition = {
  name: {
    type: "String",
    required: true
  },
  email: {
    type: "String",
    required: true
  },
  password: {
    type: "String",
    required: true
  },
  phoneNumber: {
    type: "String",
    required: true
  },
  address: {
    type: "String",
    required: true
  },
  creditScore: {
    type: "Number",
    required: true
  },
  createdLoans: {
    type: "Array",
    required: false
  }
} as const;

// We can use it to make a schema to enforce like so.
const userSchema = new UserSchema(schemaDefinition);

export type User = Mutable<SchemaToType<typeof schemaDefinition>>;

// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
export default mongoose.model('User', userSchema, 'users');