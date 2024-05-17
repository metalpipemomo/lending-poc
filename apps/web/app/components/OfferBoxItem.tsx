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

// Maybe recharts as stretch
// Display in consistent UI to login and new offer pages

const OfferBoxItem = ({offer} : {offer: Offer}) => {

  return (
    <li key={offer._id.toString()} className="mb-2 w-full px-2 py-2 text-xs text-slate-700 bg-gray-50 rounded-lg relative">
      <div className="inline-block">
        <h1 className="text-2xl ">{offer.isLoan ? "Loan Offer" : "Borrow Offer"}</h1>
        <span className="text-2xl"><span className="font-bold pr-0.5"> $</span>{offer.loanAmount.toString()} </span>
        <span className="text-md border-black"><span className="pr-0.5"> @</span><span className="text-lg">{offer.interestRate.toString()}%</span></span>
        <h2 className="font-bold text-md mt-4">Available from:</h2>
        <div><span className="text-xs pt-6">{offer.dateOfIssue.toString().slice(0,10)}</span> <span className="font-bold">-</span> <span>{offer.expiryDate ? offer.expiryDate.toString().slice(0,10) : "No Expiration"}</span></div>
      </div>
      <div className="absolute right-2 top-3">
        <span  className="text-xl">{offer.numberOfInstallments.toString()}<span> Installments | </span><span>{offer.loanTerm.toString()} Months</span></span>
        <div className="text-right pt-1"><span className="font-bold"> Pay by: </span>{offer.dueDate.toString().slice(0,10)}</div>
        <div className="text-right pt-1"><span className={`${offer.riskLevel === "high-risk" ? 'text-[#FF0000]': offer.riskLevel === "low-risk" ? 'text-[#00FF21]': ''}`}>{offer.riskLevel}</span></div>
      </div>
      
      {/* <span><span className="font-bold"> riskLevel: </span>{offer.riskLevel.toString()}</span> */}
      {/* Check for null on expiry date since it is optional on DB schema */}
      
      <span className="absolute right-2 bottom-1"><span className="font-bold"></span>{offer.userId}</span>
      <div className="inline-block">

      </div>
    </li>
  )
}

export default OfferBoxItem;