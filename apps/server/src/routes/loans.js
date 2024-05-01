"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS
var express = require('express');
var router = express.Router();
// Importing DB IO methods from controller:
var loan_controller_1 = require("../controllers/loan-controller");
// Loan offers routes
// GET all loan offers
router.get('/offers', loan_controller_1.getLoanOffers);
// POST a single loan offer
router.post('/offers', loan_controller_1.createLoanOffer);
// UPDATE a single loan offer
router.patch('/offers/:id', loan_controller_1.updateLoanOffer);
// DELETE a single loan offer
router.delete('/offers/:id', loan_controller_1.deleteLoanOffer);
// Loan requests routes
// GET all loan requests
router.get('/requests', loan_controller_1.getLoanRequests);
// POST a single loan request
router.post('/requests', loan_controller_1.createLoanRequest);
// UPDATE a single loan request
router.patch('/requests/:id', loan_controller_1.updateLoanRequest);
// DELETE a single loan request
router.delete('/requests/:id', loan_controller_1.deleteLoanRequest);
module.exports = router;
