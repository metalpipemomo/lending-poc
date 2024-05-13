// By default want to render most of react on server but we offload small isolated interactive parts to render in client
// Browser events like click and drag won't work unless it's client rendered
// This is the NextJS directive that flags a component to be rendered on client
'use client';
import { useState, useEffect } from 'react';

// Data structure for offer entered to DB.
// interface Offer{
//   userId: String,
//   loanAmount: Number,
//   interestRate: Number,
//   dueDate: Date,
//   dateOfIssue: Date,
//   loanTerm: Number,
//   numberOfInstallments: Number,
//   isLoan: Boolean,
//   riskLevel: String,
//   expiryDate: Date
// }

// Fetch to post offer to endpoint
// async function postOffer(data: Offer): Promise<Response> {
//   const res = await fetch('http://localhost:4040/api/loan-service/offers/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (!res.ok) {
//     throw new Error(`Error! Was not able to post offer: ${res.statusText}`);
//   } else{
//     console.log("SUCCESSFUL POST!")
//   }
//   return await res.json();
// }

// const packageAndPost = () => {
  
// }



const MakeNewOffer = () => {
//   const [formData, setFormData] = useState<Offer>({
//     userId: '',
//     loanAmount: '',
//     interestRate: '',
//     dueDate: '',
//     dateOfIssue: '',
//     loanTerm: '',
//     numberOfInstallments: '',
//     isLoan: '',
//     riskLevel: '',
//     expiryDate: '',
// });

//   const handleFormSubmit = (event: Event) => {
//     event.preventDefault(); // Prevent form submission (optional)

//     const form = event.target;
//     const data = new FormData(form:);

//     // Convert FormData to a JavaScript object
//     const formDataObject = {};
//     data.forEach((value, key) => {
//         formDataObject[key] = value;
//     });

//     // Call your function with the form data object
//     packageAndPost(formDataObject);
// };
  const [isLoan, setIsLoan] = useState(true);
  const [detailsReady, setDetailsReady] = useState(false);

  // TODO: reorder tailwind classes for TS standards
  // Handle case differences for borrow offer and loan offer -> eg posting a borrow does not need risk inputted as it's calculated later on separate service.
  return (
    <>
    {/* Component Wrapper maybe make another wrapper with overflow-hidden and relative*/}
    <div className="relative flex  min-h-screen max-w-[2520px] flex-col items-center justify-center overflow-hidden">
      {/* Card background wrapper */}
      <div className="bg-gray-50 px-10 py-7 rounded-lg max-w-md relative">
         {/* TITLE DIV */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-2xl text-center text-slate-700">
            {isLoan ? 'Post an offer to lend' : 'Post an offer to borrow'}
          </h2>
        </div>
        {/* SUB TITLE DIV */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className=" text-center text-sm tracking-tight text-gray-500">
            {isLoan? 'Enter your details below' : 'Enter your details below'}
          </div>
        </div>
        {/* Form container wrapper */}
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm"> 
          <form className="w-fit  space-y-3 p-1" onSubmit={()=>{}}>
            {/* TOGGLE TYPE BUTTON */}
            {/* <div className="flex items-center justify-center mt-2">
              <button
                className={`w-9/12 py-3 text-sm font-semibold rounded-full shadow-sm ${isLoan
                  ? "bg-black text-white hover:opacity-95 focus:outline-none focus:ring-2"
                  : "bg-gray-200 text-gray-400"
                  } `}
              >
                Post Offer
              </button>
            </div> */}
            <div className="flex w-fit flex-col gap-2.5 text-black">
              <div>
                {/* LOAN AMOUNT INPUT DIV  */}
                <div className="my-4">
                  <input
                    // TODO: Will read into input params and configure for error handling next
                    // {...register("password", {
                    //   required: "Password is required",
                    //   minLength: {
                    //     value: 8,
                    //     message: "Password must be at least 8 characters",
                    //   },
                    // })}
                    type="text"
                    placeholder="Loan amount"
                    className="block w-fit rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* INTEREST RATE INPUT DIV  */}
                <div className="my-4">
                  <input
                    // TODO: Update types depending on input
                    type="text"
                    placeholder="Interest rate"
                    className="block w-fit rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* DUE DATE INPUT DIV  */}
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Due date"
                    className="block w-fit rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* DATE ISSUED INPUT DIV -> TODO: SHOULD BE AUTOFILLED BASED ON DATE THIS IS POSTED NO NEED FOR USER INPUT */}
                {/* <div className="my-4">
                  <input
                    type="text"
                    placeholder="Date Issued"
                    className="block w-fit rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div> */}
                {/* LOAN TERM INPUT DIV  */}
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Term of loan"
                    className="block w-fit rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* INSTALLMENTS INPUT DIV  */}
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Number of installments"
                    className="block w-fit rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* RISK INPUT DIV -> ONLY NEED TO SHOW ON LOAN OFFER NOT BORROW OFFER  */}
                {isLoan && 
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Risk threshold"
                    className="block w-fit rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                }
                {/* EXPIRY INPUT DIV  */}
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Date of expiry"
                    className="block w-fit rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <div className="flex items-center justify-center mt-2">
              <button
                type="submit"
                disabled={detailsReady}
                className={`w-9/12 py-3 text-sm font-semibold rounded-full shadow-sm ${detailsReady
                  ? "bg-black text-white hover:opacity-95 focus:outline-none focus:ring-2"
                  : "bg-gray-200 text-gray-400"
                  } `}
              >
                Post Offer
              </button>
            </div>
            {/* FOOTER MESSAGE */}
            <div className=" flex items-center justify-center">
              <label htmlFor="agree" className="text-sm text-gray-900">
                Please ensure details are correct
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default MakeNewOffer


// const exampleLoanData = {
//   userId: "userTestFromFrontEnd",
//   loanAmount: 4930,
//   interestRate: 2.0,
//   dueDate: "2025-04-22",
//   dateOfIssue: "2024-04-13",
//   loanTerm: 3,
//   numberOfInstallments: 1,
//   isLoan: true,
//   riskLevel: "low-risk",
//   expiryDate: "2024-09-09"
// };