// Segregates db I/O logic from the routes and models 
import { UserModel, LoanModel, Loan } from '@repo/models';
// May need to validate things later
import mongoose from 'mongoose';
import { Request, Response } from "express";
import calculateRiskScore from '../util/calculateRisk'

// ** REMEMBER WE ARE TREATING LOAN REQUESTS AND LOAN OFFERS AS THE SAME SCHEMA BUT WITH BOOLEAN TO DISTINGUISH
// So both loan request/loan offer = loan data entry, we distinguish which one an entry is with the isLoan parameter
// With this schema intended effect is we can compare data of separate entries to find matches based on that distinction.

// CRUD operation to read all loan offers from DB
export const getLoans = async (req: Request, res: Response) => {
  // Check for errors or empty on response
  try{
    // Find method to select all data entries from collection on connected cluster for loan offers
    const offers = await LoanModel.find({}); // blank obj to get all

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

// CRUD operation to read a single loan offer/requests info by ID
export const getLoanById = async (req: Request, res: Response) => {
  // grab id from passed params which are in req.params
  const { id } = req.params;

  // make sure id is valid mongoose type id
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such loan, invalid ID.'});
  }

  try{
    // Use Model.findByID to find unique entries
    const loan = await LoanModel.findById(id); 

    if(!loan){
      return res.status(404).json({error: 'No such loan.'});
    }

    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({error: 'Internal error attempting to fetch loan entry by ID.'});
  }
}

// CRUD operation to create a single loan offer/request
export const createLoan = async (req: Request, res: Response) => {
  // Get the data parameters entered by user from post request body
  const loanData = req.body;

  try{

    if (loanData.isLoan === 'false') {
      const user = await UserModel.findById(loanData.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const creditScore = user.creditScore;
      const riskLevel = calculateRiskScore(loanData.loanAmount, creditScore)
      loanData.riskLevel = riskLevel
    }
    // Make a new document entry using the Loan mongoose schema using the posted loanData
    console.log("loan data in tr catch: ")
    console.log(loanData)
    const newLoanEntry = new LoanModel(loanData); // newLoanEntry is the returned
    // Asynchronously save the loanData to the mongoDB collection, returns the saved data entry with generated mongoID.
    const savedLoanEntry = await newLoanEntry.save();

    // respond 201 for new resource creation
    return res.status(201).json(savedLoanEntry)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Internal error while attempting to create loan entry.'});
  }
}

// CRUD operation for updating a loan offer/request by ID
export const updateLoan = async (req: Request, res: Response) => {
  // grab id from passed params which are in req.params
  const { id } = req.params;
  // Get the data parameters entered by user from patch request body
  const dataToUpdate = req.body;
  // options for findByIdAndUpdate. new indicates to return the modified doc in response of successful patch not the old one.
  const options = { new: true };

  try{
    // Use mongoose findByIdAndUpdate function
    // Params for function: (idToUpdate, updateData, options)
    // Returns updated document on DB if successful
    if (dataToUpdate.isLoan === 'false') {
      const user = await UserModel.findById(dataToUpdate.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const creditScore = user.creditScore;
      const riskLevel = calculateRiskScore(dataToUpdate.loanAmount, creditScore)
      dataToUpdate.riskLevel = riskLevel
    }
    const updatedLoanResult = await LoanModel.findByIdAndUpdate(id, dataToUpdate, options);

    if(!updatedLoanResult){ // No loan entry found case
      console.log("No loan found by ID."); // Log detailed error for backend
      res.status(404).json({message: 'No loan entry found by that ID to update.'})
    } else { // Loan entry found and updated case
      res.status(200).json(updatedLoanResult);
    }
  } catch(error){
    res.status(500).json({error: 'Internal error attempting to update loan entry by ID'});
  }
}

//Define CRUD operation for deleting a loan offer/request by ID
export const deleteLoan = async (req: Request, res: Response) => {
  // grab id from passed params which are in req.params
  const { id } = req.params;

  try{
    // Use mongoose findByIdAndDelete function
    // Returns deleted document from DB if successful
    const deletedLoanEntry = await LoanModel.findByIdAndDelete(id);

    if(!deletedLoanEntry){ // No loan entry found to delete
      console.log("No loan found by ID to delete.");
      res.status(404).json({message: 'No loan entry found by that ID to delete.'})
    } else { // Loan entry found and deleted successfully
      res.status(200).json(deletedLoanEntry);
    }
  } catch(error){
    res.status(500).json({error: 'Internal error attempting to delete loan entry by ID'});
  }
}