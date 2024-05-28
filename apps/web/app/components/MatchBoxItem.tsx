'use client'
import React, {useState, useEffect} from 'react'
import { ObjectId } from 'mongodb';


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
        <h1 className="text-xl ">{isLender ? "Matched Borrower" : "Matched Lender"}</h1>
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
    </li>
  )
}

export default MatchBoxItem;