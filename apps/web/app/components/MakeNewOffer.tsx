// By default want to render most of react on server but we offload small isolated interactive parts to render in client
// Browser events like click and drag won't work unless it's client rendered
// This is the NextJS directive that flags a component to be rendered on client
'use client';
import { useState, useEffect, useRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// Updating to use axios as rest of team using to streamline api calls and handling of promises.
// import Axios from "../../lib/AxiosBase";
import Axios from 'axios';
import { DefaultFormValues } from 'react-phone-number-input/react-hook-form';
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken';

// Data structure for offer entered to DB which is mix of user inputted fields and computer generated fields
interface Offer{
  userId: string,
  loanAmount: number,
  interestRate: number,
  dueDate: string,
  dateOfIssue: string, // Generated
  loanTerm: number,
  numberOfInstallments: number,
  isLoan: boolean, // Set by boolean
  riskLevel: string, // Generated for borrowing case, set by input for lending case
  expiryDate: string
}

const MakeNewOffer = () => {
  // Component state
  const [isLoan, setIsLoan] = useState(true);
  const [detailsReady, setDetailsReady] = useState(false);

  // For customizing date inputs a bit
  const expiryDateRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  // For redirecting on client side after post request completes
  const router = useRouter();

  // Default state of form for reset should be same as offer schema except for fields that are generated seperate from user's input
  const formDefaultState = {
    defaultValues: {
      loanAmount: "",
      interestRate: "",
      dueDate: "",
      loanTerm: "",
      numberOfInstallments: "",
      riskLevel: "", // This wont be there in isLoad case, do I need two default states and two forms or can I just hide and nullify some fields.
      expiryDate: "",
    },
  };

  /// Helpers for manipulating input dom based on input status from react-hook-form package
  const {
    register, // used to register inputs as controls to be tracked by formState of react-hook-form
    handleSubmit, // used to pass an intended submit handling function the form state
    formState: { errors, isSubmitting },
    reset,
    // Optimized helper for reading form values from react-hook-form package
    getValues,
    control
  } = useForm<FieldValues>({ defaultValues: formDefaultState, mode: "onBlur" });

  // Handler for form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data: DefaultFormValues) => {
    // Consts pulled from form to be following offer data schema and default form state
    const {loanAmount, interestRate, dueDate, loanTerm, numberOfInstallments, riskLevel, expiryDate} = getValues();
    // TODO: Still need to add the non input fields that are generated in the post request
    // For borrows: add issue date and need to add riskLevel based on risk assessment code 
    // For loans: need to add the issue date
    console.log("Form submitted: ", data);

    let postData: Offer;
    const lsId = localStorage.getItem('loggedInUserId');

    // GET HELP WITH DECODING AND ATTACHING USER ID TO POST REQUESTS
  //   // Get token to pass in headers for auth
  //   const JWTToken = localStorage.getItem('jwtToken');
  //   console.log("token test: ")
  //   console.log(JWTToken);
  //   // get user id from JWTToken 
  //   // const tokenUserId = 

  //   try {
  //     if (JWTToken && process.env.SECRET_KEY) {
  //         const decoded = jwt.verify(JWTToken, process.env.SECRET_KEY);
  //         const extractedUserId = decoded.id;
  //         console.log('Extracted User ID:', extractedUserId);
  //     } else {
  //         console.error('JWTToken is null or undefined.');
  //     }
  // } catch (error) {
  //     console.error('Error decoding token:', error.message);
  // }

    // Distinguish what type of offer this is and generate non-inputted fields to complete post data obj
    if(isLoan && lsId){
      postData = {
        userId: lsId,
        loanAmount: parseInt(loanAmount),
        interestRate: parseFloat(interestRate),
        dueDate: dueDate,
        dateOfIssue: new Date().toISOString(), // added by computer for current date
        loanTerm: parseInt(loanTerm),
        numberOfInstallments: parseInt(numberOfInstallments),
        isLoan: true,
        riskLevel: riskLevel, // use inputted risk string in a lending loan offer case
        expiryDate: expiryDate
      } 
    } else if(lsId){
      const rlevel = setRiskLevel({ desiredRisk: "random" }); // use generated risk string in borrow offer case -> for now using dummy method instead of a risk service
      postData = {
        userId: lsId,
        loanAmount: parseInt(loanAmount),
        interestRate: parseFloat(interestRate),
        dueDate: dueDate,
        dateOfIssue: new Date().toISOString(),
        loanTerm: parseInt(loanTerm),
        numberOfInstallments: parseInt(numberOfInstallments),
        isLoan: false,
        riskLevel: rlevel ?? "", // null check
        expiryDate: expiryDate
      } 
    }
    const JWTToken = localStorage.getItem('jwtToken');
    Axios.post("http://localhost:4040/api/loan-service/offers/", postData, { headers: {'content-type': 'application/json', "Authorization" : `Bearer ${JWTToken}`}})
    .then((e) => {
      console.log(e)
      router.push('/dashboard');
    })
    .catch((e) => {
      console.log(e)
    })
  };

  // Placeholder for now, later this will be determined by the services coded by Jingshi/Marko
  // Randomly assigns a risk level or uses the passed risk level to assign to a borrowing user's offer
  const setRiskLevel = ({ desiredRisk }: { desiredRisk: string }) => {
    if(desiredRisk === "random"){
      const riskLevels = ["black-listed", "low-risk", "high-risk"];
      const randomIndex = Math.floor(Math.random() * riskLevels.length);
      return riskLevels[randomIndex];
    } else return desiredRisk;
  }

  // Toggle fields for borrow/lend offers by setting isLoan boolean
  const handleToggle = () => {
    setIsLoan(!isLoan);
    // Anything else we need to do
  }

  // TODO: reorder tailwind classes for TS standards
  // Handle case differences for borrow offer and loan offer -> eg posting a borrow does not need risk inputted as it's calculated later on separate service.
  return (
    <>
    {/* Component Wrapper maybe make another wrapper with overflow-hidden and relative*/}
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Card background wrapper */}
      <div className="bg-gray-50 px-10 py-7 w-1/4 max-w-md rounded-lg relative">
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
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"> 
          {/* Form has no validate attribute so validation is handled by react-hook-form instead */}
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate> 
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
            <div className="flex items-center w-full flex-col gap-2.5 text-black">
              <div className="w-10/12">
                {/* LOAN AMOUNT INPUT DIV  */}
                <div className="my-4">
                  <input
                    //TODO: Will read into input params and configure for error handling next
                    {...register("loanAmount", {
                      required: "Loan amount is required"
                    })}
                    type="number"
                    min="1"
                    max="999999999"
                    placeholder="Loan amount"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                  <p className="text-red-700 text-sm mt-1">{`${errors.loanAmount?.message || ''}`}</p>
                </div>
                {/* INTEREST RATE INPUT DIV  */}
                <div className="my-4">
                  <input
                    // TODO: Update types depending on input
                    {...register("interestRate", {
                      required: "Interest rate is required"
                    })}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Interest rate"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                  <p className="text-red-700 text-sm mt-1">{`${errors.interestRate?.message || ''}`}</p>
                </div>
                {/* LOAN TERM INPUT DIV  */}
                <div className="my-4">
                  <input
                    {...register("loanTerm", {
                      required: "Loan term is required"
                    })}
                    type="number"
                    min="1"
                    max="999"
                    placeholder="Term of loan"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                  <p className="text-red-700 text-sm mt-1">{`${errors.loanTerm?.message || ''}`}</p>
                </div>
                {/* INSTALLMENTS INPUT DIV  */}
                <div className="my-4">
                  <input
                    {...register("numberOfInstallments", {
                      required: "Number of installments is required"
                    })}
                    type="number"
                    min="1"
                    max="9999"
                    placeholder="Number of installments"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                  <p className="text-red-700 text-sm mt-1">{`${errors.numberOfInstallments?.message || ''}`}</p>
                </div>
                {/* DUE DATE INPUT DIV  */}
                <div className="my-4">
                  <input
                    {...register("dueDate", {
                      required: "Due date is required"
                    })}
                    type="text"
                    placeholder="Due date"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                  <p className="text-red-700 text-sm mt-1">{`${errors.dueDate?.message || ''}`}</p>
                </div>
                {/* EXPIRY INPUT DIV  */}
                <div className="my-4">
                  <input
                    {...register("expiryDate", {
                      required: "Expiration date is required"
                    })}
                    type="text"
                    placeholder="Date of expiry"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                  <p className="text-red-700 text-sm mt-1">{`${errors.expiryDate?.message || ''}`}</p>
                </div>
                {/* RISK INPUT DIV -> ONLY NEED TO SHOW ON LOAN OFFER NOT BORROW OFFER  */}
                {isLoan && 
                <>
                  <div className="my-4">
                    <input
                      {...register("riskLevel", {
                        required: "Risk threshold is required",
                        validate: (fieldValue) => {
                          return (fieldValue == "high-risk" || fieldValue == "low-risk") || "Please enter either low-risk or high-risk.";
                        }
                      })}
                      type="text"
                      placeholder="Risk threshold"
                      className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                    />
                    <p className="text-red-700 text-sm mt-1">{`${errors.riskLevel?.message || ''}`}</p>
                  </div>
                </>
                }
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <div className="flex items-center justify-center mt-2">
              <button
                type="submit"
                disabled={detailsReady}
                className={`w-9/12 py-3 text-sm font-semibold rounded-full shadow-sm ${Object.keys(errors).length === 0
                  ? "border border-black bg-black text-white hover:opacity-95 hover:bg-gray-300 hover:text-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2"
                  : "border border-gray-200 bg-gray-200 text-gray-400"
                  } `}
              >
                Post Offer
              </button>
            </div>
            {/* TOGGLE BUTTON */}
            <div className="flex items-center justify-center mt-2">
              <div className="w-fit px-3 py-2 text-sm font-semibold rounded-full shadow-sm border border-black bg-black text-center text-white hover:bg-gray-300 hover:text-gray-800 hover:border-gray-800 cursor-pointer focus:outline-none focus:ring-2" onClick={handleToggle}><h2 className="">{isLoan ? 'Borrow Money Instead' : ' Lend Money Instead'}</h2></div>
            </div>
            {/* FOOTER MESSAGE */}
            <div className=" flex items-center justify-center">
              <label htmlFor="agree" className="text-sm text-gray-900">
                Please ensure details are correct
              </label>
            </div>
          </form>
          {/* <DevTool control={control}/> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default MakeNewOffer

// Fetch to post offer to endpoint -> probably can another way
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

// const packageAndPost = () => {
  
// }

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


// RADIO BUTTON APPROACH WAS NOT WORKING QUICK ENOUGH SCRAPPED FOR NOW
// {isLoan && 
//   <>
//     <div className="my-4 flex flex-row justify-between px-16 mb-4 pt-0.5">
//       <div className="inline flex flex-col items-center gap-1">
//         <input
//           {...register("riskLevel", {
//             required: "Risk threshold is required"
//           })}
//           type="radio"
//           id="low-risk"
//           name={'lowRisk'}  
//           placeholder="Risk threshold"
//           className="inline w-full rounded-md py-3 text-center bg-white text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
//         />
//         <label className="" htmlFor="low-risk">Low risk</label>
//       </div>
//       <div className="inline flex flex-col items-center gap-1">
//         <input
//           {...register("riskLevel", {
//             required: "Risk threshold is required"
//           })}
//           type="radio"
//           id="high-risk"
//           name={'highRisk'}  
//           placeholder="Risk threshold"
//           className="inline w-full rounded-md py-3 text-center bg-white text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
//         />
//         <label htmlFor="high-risk" className="">High risk</label>
//       </div>
//     </div>
//     <p className="text-red-700 text-sm mt-1 block text-center">{`${errors.riskLevel?.message || ''}`}</p>
//   </>
//   }