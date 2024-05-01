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
router.get('/loan-service/offers', getLoanOffers);
// POST a single loan offer
router.post('/loan-service/offers', createLoanOffer);
// UPDATE a single loan offer
router.patch('/loan-service/offers/:id', updateLoanOffer);
// DELETE a single loan offer
router.delete('/loan-service/offers/:id', deleteLoanOffer);

// Loan requests routes
// GET all loan requests
router.get('/loan-service/requests', getLoanRequests);
// POST a single loan request
router.post('/loan-service/requests', createLoanRequest);
// UPDATE a single loan request
router.patch('/loan-service/requests/:id', updateLoanRequest);
// DELETE a single loan request
router.delete('/loan-service/requests/:id', deleteLoanRequest);

module.exports = router;