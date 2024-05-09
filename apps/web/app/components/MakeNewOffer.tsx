// By default want to render most of react on server but we offload small isolated interactive parts to render in client
// Browser events like click and drag won't work unless it's client rendered
// This is the NextJS directive that flags a component to be rendered on client
'use client';
import React from 'react'

// Data structure for offer entered to DB.
interface Offer{
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

// Fetch to post offer to endpoint
async function postOffer(data: Offer): Promise<Response> {
  const res = await fetch('http://localhost:4040/api/loan-service/offers/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error(`Error! Was not able to post offer: ${res.statusText}`);
  } else{
    console.log("SUCCESSFUL POST!")
  }
  return await res.json();
}



const MakeNewOffer = () => {
  const exampleLoanData = {
    userId: "userTestFromFrontEnd",
    loanAmount: 4930,
    interestRate: 2.0,
    dueDate: "2025-04-22",
    dateOfIssue: "2024-04-13",
    loanTerm: 3,
    numberOfInstallments: 1,
    isLoan: true,
    riskLevel: "low-risk",
    expiryDate: "2024-09-09"
  };

  return (
    <div>
      <form className="w-fit border border-white bg-gray-700 text-white hover:bg-gray-800 ">
        <input type="text" name="test"></input>
        <button className="bg-gray-700 p-1 text-white hover:bg-gray-800" onClick={()=>{console.log('Click'); postOffer({
    userId: "userTestFromFrontEnd",
    loanAmount: 4930,
    interestRate: 2.0,
    dueDate: new Date("2025-04-22"),
    dateOfIssue: new Date("2024-04-13"),
    loanTerm: 3,
    numberOfInstallments: 1,
    isLoan: true,
    riskLevel: "low-risk",
    expiryDate: new Date("2024-09-09")
  });}}>Post Offer</button>
      </form>
    </div>
  )
}

export default MakeNewOffer