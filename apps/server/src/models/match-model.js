// Mongoose enables devs to define schema for documents uploaded to the database. MongoDB is schemaless by default.
var mongooseMatchImport = require('mongoose');
var MatchSchema = mongooseMatchImport.Schema; // function to create a schema
// We can use it to make a schema to enforce like so.
var matchSchema = new MatchSchema({
    _id: {
        type: mongooseMatchImport.Types.ObjectId,
        required: true
    },
    loanerId: {
        type: String,
        required: true
    },
    borrowerId: {
        type: String,
        required: true
    },
    offerId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
// Creates a model based on schema to be used for interactions with DB collection of that name.
// mongoose.model() params: Model name, mongoose schema, target DB collection name
module.exports = mongooseLoanImport.model('Match', matchSchema, 'matches');
