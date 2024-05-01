// IMPORTS
const express = require('express');
const router = express.Router();

// Importing DB IO methods from controller:
import {
  getLoanOffers,
  getLoanRequests,
  // TODO: Finish definitions on controller
  createLoanOffer,
  createLoanRequest,
  updateLoanOffer,
  updateLoanRequest,
  deleteLoanOffer,
  deleteLoanRequest
} from '../controllers/loan-controller';

// Loan offers routes
// GET all loan offers
router.get('/offers', getLoanOffers);
// POST a single loan offer
router.post('/offers', createLoanOffer);
// UPDATE a single loan offer
router.patch('/offers/:id', updateLoanOffer);
// DELETE a single loan offer
router.delete('/offers/:id', deleteLoanOffer);

// Loan requests routes
// GET all loan requests
router.get('/requests', getLoanRequests);
// POST a single loan request
router.post('/requests', createLoanRequest);
// UPDATE a single loan request
router.patch('/requests/:id', updateLoanRequest);
// DELETE a single loan request
router.delete('/requests/:id', deleteLoanRequest);

module.exports = router;