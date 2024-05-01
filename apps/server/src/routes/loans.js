"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS
var express = require('express');
var router = express.Router();
// Importing DB IO methods from controller:
var loan_controller_1 = require("../controllers/loan-controller");
// Loan routes
// GET all loan entries
router.get('/offers', loan_controller_1.getLoans);
// GET a single loan entry by ID
router.get('/offers/:id', loan_controller_1.getLoanInfo);
// POST a single loan entry
router.post('/offers', loan_controller_1.createLoan);
// UPDATE a single loan entry
router.patch('/offers/:id', loan_controller_1.updateLoan);
// DELETE a single loan entry
router.delete('/offers/:id', loan_controller_1.deleteLoan);
module.exports = router;
/// SWITCHING TO SINGLE LOAN COLLECTION FOR REQUESTS/OFFERS OLD SEGREGATION APPROACH COMMENTED OUT
// import {
//   getLoanOffers,
//   getLoanRequests,
//   // TODO: Finish definitions on controller
//   createLoanOffer,
//   createLoanRequest,
//   updateLoanOffer,
//   updateLoanRequest,
//   deleteLoanOffer,
//   deleteLoanRequest
// } from '../controllers/loan-controller';
// // Loan offers routes
// // GET all loan offers
// router.get('/offers', getLoanOffers);
// // POST a single loan offer
// router.post('/offers', createLoanOffer);
// // UPDATE a single loan offer
// router.patch('/offers/:id', updateLoanOffer);
// // DELETE a single loan offer
// router.delete('/offers/:id', deleteLoanOffer);
// // Loan requests routes
// // GET all loan requests
// router.get('/requests', getLoanRequests);
// // POST a single loan request
// router.post('/requests', createLoanRequest);
// // UPDATE a single loan request
// router.patch('/requests/:id', updateLoanRequest);
// // DELETE a single loan request
// router.delete('/requests/:id', deleteLoanRequest);
