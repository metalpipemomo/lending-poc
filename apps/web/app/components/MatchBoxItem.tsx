'use client'
import React, {useState, useEffect} from 'react'
import { ObjectId } from 'mongodb';
import { ImCross } from "react-icons/im";
import { ImCheckmark } from "react-icons/im";


// Define an interface for explicit TS type definition according to schema of match
interface Match{
  _id: ObjectId;
  loanerId: string,
  borrowerId: string,
  offerId: string,
  status: string
}
    

// Maybe recharts as stretch
// Display in consistent UI to login and new offer pages

const MatchBoxItem = ({match} : {match: Match}) => {
  const [isLender, setIsLender] = useState(false);
  const currUserId = localStorage.getItem('loggedInUserId');

  // Determine if current user is the lender or borrower for the match
  // if(match.loanerId == currUserId){
  //   setIsLender(true)
  // } else if(match.borrowerId == currUserId){
  //   setIsLender(false);
  // }

  return (
    <li key={match._id.toString()} className="mb-2 w-full px-2 py-2 text-xs text-slate-700 bg-gray-50 rounded-lg relative">
      <div className="inline-block">
        <h1 className="text-xl pb-1">{isLender ? "Matched Borrower" : "Matched Lender"}</h1>
        <span className="text-md"><span className="font-bold pr-0.5"> Lending user: </span>{match.loanerId} </span><br/>
        <span className="text-md"><span className="font-bold pr-0.5"> Borrowing user: </span>{match.borrowerId} </span>
        <h2 className="text-md mt-4"><span className="font-bold">Status: </span><span className={match.status == "pending_match" ? 'text-[#FF0000] text-xs pt-6' : 'text-[#00FF21] text-xs pt-6'}>{match.status == "pending_match" ? 'pending' : 'accepted'}</span></h2>
        <div></div>
      </div>
      {/* <div className="absolute right-2 top-3">
        <span  className="text-xl">{offer.numberOfInstallments.toString()}<span> Installments | </span><span>{offer.loanTerm.toString()} Months</span></span>
        <div className="text-right pt-1"><span className="font-bold"> Pay by: </span>{offer.dueDate.toString().slice(0,10)}</div>
        <div className="text-right pt-1"><span className={`${offer.riskLevel === "high-risk" ? 'text-[#FF0000]': offer.riskLevel === "low-risk" ? 'text-[#00FF21]': ''}`}>{offer.riskLevel}</span></div>
      </div> */}
      <span className="absolute right-2 bottom-1"><span className="font-bold">Offer ID: </span>{match._id.toString()}</span>
      <div className="absolute top-2 right-2 flex justify-between gap-1.5 w-fit">
        <span id="dashboard-link-view-matches" className="w-fit p-1.5 cursor-pointer font-semibold rounded-full shadow-sm border border-[#FF0000] bg-[#FF0000]  text-white hover:bg-gray-50 hover:text-[#FF0000] hover:border-[#FF0000] focus:outline-none focus:ring-2"><h2 className=""><ImCross /></h2></span>
        <span id="dashboard-link-new-offer" className="w-fit p-1 cursor-pointer text-base font-semibold rounded-full shadow-sm border border-[#00FF21] bg-[#00FF21] text-white hover:bg-gray-50 hover:text-[#00FF21] hover:border-[#00FF21] focus:outline-none focus:ring-2"><h2 className=""><ImCheckmark /></h2></span>
      </div>
    </li>
  )
}

export default MatchBoxItem;