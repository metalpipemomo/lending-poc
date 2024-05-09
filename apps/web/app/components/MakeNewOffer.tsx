// By default want to render most of react on server but we offload small isolated interactive parts to render in client
// Browser events like click and drag won't work unless it's client rendered
// This is the NextJS directive that flags a component to be rendered on client
'use client';

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

  return (
    <div>
      <form className="w-fit p-1 ">
        <div className="flex w-fit flex-col gap-2.5 border border-white bg-gray-700 p-2 text-white ">
          <label>userId: </label>
          <div className=""><input type="text"></input></div>
          <label>loanAmount: </label>
          <div className=""><input type="text"></input></div>
          <label>interestRate: </label>
          <div className=""><input type="text"></input></div>
          <label>dueDate: </label>
          <div className=""><input type="text"></input></div>
          <label>dateOfIssue: </label>
          <div className=""><input type="text"></input></div>
          <label>loanTerm: </label>
          <div className=""><input type="text"></input></div>
          <label>numberOfInstallments: </label>
          <div className=""><input type="text"></input></div>
          <label>isLoan: </label>
          <div className=""><input type="text"></input></div>
          <label>riskLevel: </label>
          <div className=""><input type="text"></input></div>
          <label>expiryDate: </label>
          <div className=""><input type="text"></input></div>
        </div>
        <div className=""><button className="float-right mt-2 border border-white bg-gray-700 p-1 text-white hover:bg-gray-800">Post Offer</button></div>
      </form>
    </div>
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