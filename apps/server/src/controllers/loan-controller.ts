// Segregates db I/O logic from the routes and models 
const Loan = require('../models/loan-model');

// May need to validate things later
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Get all loan offers from DB
export const getLoanOffers = async (req, res) => {
  // TODO: update find method to select data from cluster for loan offers
  const offers = await Loan.find({}); // blank obj to get all 
  res.status(200).json(offers);
}

// Get all loan requests from DB
export const getLoanRequests = async (req, res) => {
  // TODO: update find method to select data from cluster for loan requests
  const requests = await Loan.find({}); // blank obj to get all 
  res.status(200).json(requests);
}

// TODO: Define CRUD operation for uploading a single loan offer
export const createLoanOffer = async (req, res) => {
  // const createdLoanOffer = await Loan.
  // res.status(200).json(createdLoanOffer);
}

// TODO: Define CRUD operation for uploading a single loan request
export const createLoanRequest = async (req, res) => {
  // const createdLoanRequest = await Loan.
  // res.status(200).json(createdLoanRequest);
}

// TODO: Define CRUD operation for updating a loan offer by ID
export const updateLoanOffer = async (req, res) => {
  // const updatedLoanOffer = await Loan.
  // res.status(200).json(updatedLoanOffer);
}

// TODO: Define CRUD operation for updating a loan request by ID
export const updateLoanRequest = async (req, res) => {
  // const updatedLoanRequest = await Loan.
  // res.status(200).json(updatedLoanRequest);
}

// TODO: Define CRUD operation for deleting a loan offer by ID
export const deleteLoanOffer = async (req, res) => {
  // const deletedLoanOffer = await Loan.
  // res.status(200).json(deletedLoanOffer);
}

// TODO: Define CRUD operation for deleting a loan request by ID
export const deleteLoanRequest = async (req, res) => {
  // const deletedLoanRequest = await Loan.
  // res.status(200).json(deletedLoanRequest);
}

// TODO: Define CRUD operation to get a single loan offer's info
export const getLoanOffer = async (req, res) => {
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