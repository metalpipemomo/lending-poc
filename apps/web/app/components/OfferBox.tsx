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
const OfferBox: React.FC  = async () => { // explicit type on OfferBox is inferred for the prop
  // TODO: Handle no offers loaded yet case and display warning

  const res = await fetch('/loan-service/offers/');
  const offers: Offer[] = await res.json();

  return (
    <div id="dashboard-offers-container" className="mt-2 size-fit pl-1">
      {/* Display loaded items in a list on dashboard */}
      

      <ul id="dashboard-offers" className="flex flex-wrap gap-2">
        {/* Map all the loaded entries data into list items */}
        {offers.map(offer => 
          <li key={offer._id.toString()} className="mb-2 w-1/6 border border-white bg-gray-700 p-1 text-xs text-white hover:bg-gray-800">
            <h1 className="text-xl font-bold">{offer.isLoan ? "Loan Offer" : "Borrow Offer"}</h1>
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

// Using getServerSideProps so fetch happens each time page loads.
export async function getServerSideProps() {
  // console.log("getserver")
  // try {
  //     const res = await fetch('http://localhost:4040/api/loan-service/offers/');
  //     const offers: Offer[] = await res.json();

  //     return {
  //         props: {
  //             offers,
  //         },
  //     };
  // } catch (error) {
  //     console.error('Error fetching Offers data:', error);
  //     return {
  //         props: {
  //             offers: [],
  //         },
  //     };
  // }
}