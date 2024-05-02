// Segregates db I/O logic from the routes and models 
const Loan = require('../models/loan-model');
// May need to validate things later
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// ** REMEMBER WE ARE TREATING LOAN REQUESTS AND LOAN OFFERS AS THE SAME SCHEMA BUT WITH BOOLEAN TO DISTINGUISH
// So both loan request/loan offer = loan data entry, we distinguish which one an entry is with the isLoan parameter
// With this schema intended effect is we can compare data of separate entries to find matches based on that distinction.

// Get all loan offers from DB
export const getLoans = async (req, res) => {
  // TODO: update find method to select data from cluster for loan offers
  // Mongo has yet to hold any data
  const offers = await Loan.find({}); // blank obj to get all for now
  res.status(200).json(offers);
}

// TODO: Define CRUD operation for uploading a single loan offer/request
export const createLoan = async (req, res) => {
  // const createdLoanOffer = await Loan.
  // res.status(200).json(createdLoanOffer);
}

// TODO: Define CRUD operation for updating a loan offer/request by ID
export const updateLoan = async (req, res) => {
  // const updatedLoanOffer = await Loan.
  // res.status(200).json(updatedLoanOffer);
}

// TODO: Define CRUD operation for deleting a loan offer/request by ID
export const deleteLoan = async (req, res) => {
  // const deletedLoanOffer = await Loan.
  // res.status(200).json(deletedLoanOffer);
}

// TODO: Define CRUD operation to get a single loan offer/requests info
export const getLoanInfo = async (req, res) => {
  // // grab id and type from endpoint. endpoint params are in req.params
  // const { id, loanType} = req.params;
  // // make sure id is valid mongoose type id
  // if(!mongoose.Types.ObjectId.isValid(id)){
  //   return res.status(404).json({error: 'No such loan, invalid ID.'});
  // }

  // // check what type of is being requested
  // var loan = "";
  // switch(loanType){
  //   case "offer":
  //     //loan = await Loan.findById(id); 
  //     break;
  //   case "request":
  //     //loan = await Loan.findById(id); 
  //     break;
  // }

  // if(loan == null){
  //   return res.status(404).json({error: "No such loan."}); // have to return to prevent firing rest of code.
  // }
  // // Only responds OK if loan is found
  // res.status(200).json(loan);
}