// By default want to render most of react on server but we offload small isolated interactive parts to render in client
// Browser events like click and drag won't work unless it's client rendered
// This is the NextJS directive that flags a component to be rendered on client
'use client';
import { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// Updating to use axios as rest of team using to streamline api calls and handling of promises.
import Axios from "../../lib/AxiosBase";

// Data structure for offer entered to DB which is mix of user inputted fields and computer generated fields
interface Offer{
  userId: String,
  loanAmount: Number,
  interestRate: Number,
  dueDate: Date,
  dateOfIssue: Date, // Generated
  loanTerm: Number,
  numberOfInstallments: Number,
  isLoan: Boolean, // Set by boolean
  riskLevel: String, // Generated for borrowing case, set by input for lending case
  expiryDate: Date
}

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


  // Component state
  const [isLoan, setIsLoan] = useState(true);
  const [detailsReady, setDetailsReady] = useState(false);
  const api = Axios(); // used to make api calls

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
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // Optimized helper for reading form values from react-hook-form package
    getValues,
  } = useForm<FieldValues>({ defaultValues: formDefaultState, mode: "onBlur" });

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

  // Handler for form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Consts pulled from form to be following offer data schema and default form state
    const {loanAmount, interestRate, dueDate, loanTerm, numberOfInstallments, riskLevel, expiryDate} = getValues();
    // TODO: Still need to add the non input fields that are generated in the post request
    // For borrows: add issue date and need to add riskLevel based on risk assessment code 
    // For loans: need to add the issue date

    // Distinguish what type of offer this is and generate non-inputted fields to complete post data obj
    if(isLoan){
      const postData = {
        loanAmount: loanAmount,
        interestRate: interestRate,
        dueDate: dueDate,
        dateOfIssue: new Date(), // added by computer
        loanTerm: loanTerm,
        numberOfInstallments: numberOfInstallments,
        riskLevel: riskLevel, // use inputted risk string in a lending loan offer case
        expiryDate: expiryDate
      } 
    } else{
      const postData = {
        loanAmount: loanAmount,
        interestRate: interestRate,
        dueDate: dueDate,
        dateOfIssue: new Date(),
        loanTerm: loanTerm,
        numberOfInstallments: numberOfInstallments,
        riskLevel: setRiskLevel({ desiredRisk: "random" }), // use generated risk string in borrow offer case -> for now using dummy method instead of a risk service
        expiryDate: expiryDate
      } 
    }

    api?.post("loan-service/offers/", {
      loanAmount: loanAmount,
      interestRate: interestRate,
      dueDate: dueDate,
      loanTerm: loanTerm,
      numberOfInstallments: numberOfInstallments,
      riskLevel: riskLevel,
      expiryDate: expiryDate
    })
    .then((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })
  };

  useEffect(()=>{
    // Check if inputted data is ready -> can do with the axios field methods and error handling/constraints 
    // TODO: Make this check dependant on error handling once inputs are updated to handle errors/constraints
    if(true){

    }
  }, []);

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
          <form className="space-y-3" onSubmit={()=>{}}>
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
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* INTEREST RATE INPUT DIV  */}
                <div className="my-4">
                  <input
                    // TODO: Update types depending on input
                    type="text"
                    placeholder="Interest rate"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* DUE DATE INPUT DIV  */}
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Due date"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
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
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* INSTALLMENTS INPUT DIV  */}
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Number of installments"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                {/* RISK INPUT DIV -> ONLY NEED TO SHOW ON LOAN OFFER NOT BORROW OFFER  */}
                {isLoan && 
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Risk threshold"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                  />
                </div>
                }
                {/* EXPIRY INPUT DIV  */}
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Date of expiry"
                    className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
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