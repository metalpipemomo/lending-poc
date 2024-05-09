// Omitting the use client directive as we want to fetch and render dashboard offers on server not client.
import React from 'react'
import { ObjectId } from 'mongodb';

// Define an interface for explicit TS type definition according to schema
interface Offer{
  _id: ObjectId; // Does this need to be ObjectId?
  userId: String,
  loanAmount: Number,
  interestRate: Number,
  dueDate: Date,
  dateOfIssue: Date,
  loanTerm: Number,
  numberOfInstallments: Number,
  isLoan: Boolean,
  riskLevel: String,
  expiryDate: Date
}

// React component for an offer loaded from the DB. Displayed on dashboard.
const OfferBox = async () => {
  // FETCH with local hosted backend api endpoint for now, will be a deployment URL in production
  const res = await fetch('http://localhost:4040/api/loan-service/offers/');
  const offers: Offer[] = await res.json();

  return (
    <div id="dashboard-offers-container" className="mt-2 size-fit">
      <span>Fetch and load DB entries here on load, this should be server side rendered component since its just initial batch read and no interactive requirements</span>
      <h1 className="mt-2">Loaded Offers: </h1>
      {/* Display loaded items in a list on dashboard */}
      <ul id="dashboard-offers" className="border-collapse">
        {/* Map all the loaded entries data into list items */}
        {offers.map(offer => 
          <li key={offer._id.toString()} className="mb-2 w-fit border border-white bg-gray-700 p-1 text-white hover:bg-gray-800 ">
            <h1 className="text-2xl font-bold">{offer.isLoan ? "Loan Offer" : "Borrow Offer"}</h1>
            <div><span className="font-bold">userId: </span>{offer.userId}</div>
            <div><span className="font-bold">loanAmount: </span>{offer.loanAmount.toString()}</div>
            <div><span className="font-bold">interestRate: </span>{offer.interestRate.toString()}</div>
            <div><span className="font-bold">dueDate: </span>{offer.dueDate.toString()}</div>
            <div><span className="font-bold">dateOfIssue: </span>{offer.dateOfIssue.toString()}</div>
            <div><span className="font-bold">loanTerm: </span>{offer.loanTerm.toString()}</div>
            <div><span className="font-bold">numberOfInstallments: </span>{offer.numberOfInstallments.toString()}</div>
            <div><span className="font-bold">riskLevel: </span>{offer.riskLevel.toString()}</div>
            {/* Check for null on expiry date since it is optional on DB schema */}
            <div><span className="font-bold">expiryDate: </span>{offer.expiryDate ? offer.expiryDate.toString() : "No Expiration"}</div> 
          </li>
        )}
      </ul>
    </div>
  )
}

export default OfferBox