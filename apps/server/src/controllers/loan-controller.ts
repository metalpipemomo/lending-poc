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
  // Check for errors or empty on response
  try{
    // Find method to select all data entries from collection on connected cluster for loan offers
    const offers = await Loan.find({}); // blank obj to get all

    // Check if response was empty
    if(offers.length === 0){
      // 404 resource not found
      return res.status(404).send('No loan entries found.');
    }

    // Otherwise return 200 OK with the loan entries as json
    res.status(200).json(offers);
  } catch (error) {
    // 500 internal error response 
    res.status(500).send('Internal error attempting to fetch loan entries.');
  }
}

// CRUD operation to get a single loan offer/requests info by ID
export const getLoanById = async (req, res) => {
  console.log("in getLoanById");
  // grab id from passed params which are in req.params
  const { id } = req.params;

  // make sure id is valid mongoose type id
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such loan, invalid ID.'});
  }

  try{
    // Use Model.findByID to find unique entries
    const loan = await Loan.findById(id); 

    if(!loan){
      return res.status(404).json({error: 'No such loan.'});
    }

    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({error: 'Internal error attempting to fetch loan entry by ID.'});
  }
}

// TODO: Define CRUD operation for uploading a single loan offer/request
export const createLoan = async (req, res) => {
  // Get the data parameters entered by user from post request body
  const loanData = req.body;

  try{
    // Make a new document entry using the Loan mongoose schema using the posted loanData
    const newLoanEntry = new Loan(loanData); // newLoanEntry is the returned
    // Asynchronously save the loanData to the mongoDB collection, returns the saved data entry with generated mongoID.
    const savedLoanEntry = await newLoanEntry.save();

    // respond 201 for new resource creation
    return res.status(201).json(savedLoanEntry)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Internal error while attempting to create loan entry.'});
  }
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