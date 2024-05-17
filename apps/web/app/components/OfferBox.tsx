// If we want to optimize for server side then we will not use client directive as we want to fetch and render dashboard offers on server not client.
// need to modify axios base to handle server side API calls if we do optimize this
'use client'
import React from 'react'
import { ObjectId } from 'mongodb';
// Since client rendered we will use the react state hooks
import { useState, useEffect } from 'react';
// import Axios from "../../lib/AxiosBase"; // for api calls
import Axios from 'axios';
import OfferBoxItem from '../components/OfferBoxItem';
import DashboardGraphics from './DashboardGraphics';
import FilteringOptions from './FilteringOptions';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";

// Define an interface for explicit TS type definition according to schema
interface Offer{
  _id: ObjectId; // Does this need to be ObjectId?
  userId: string,
  loanAmount: number,
  interestRate: number,
  dueDate: string,
  dateOfIssue: string,
  loanTerm: number,
  numberOfInstallments: number,
  isLoan: boolean,
  riskLevel: string,
  expiryDate: string
}

// React component for an offer loaded from the DB. Displayed on dashboard.
const OfferBox: React.FC  = () => { // explicit type on OfferBox is inferred for the prop
  // Pulled data state
  const [fetchedOffers, setFetchedOffers] = useState<Offer[]>([]); // To hold raw api response
  const [currentFilteredOffers, setCurrentFilteredOffers] = useState<Offer[]>([]);
  const [loanOffers, setLoanOffers] = useState<Offer[]>([]); // for filtering loans
  const [borrowOffers, setBorrowOffers] = useState<Offer[]>([]); // for filtering borrows
  // Pagination state
  const [displayedOffers, setDisplayedOffers] = useState<Offer[]>([]); // for displaying current paginated results
  const [maxPageCount, setMaxPageCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const maxOffers = 6;
  // TODO: Integrate axios
  //const api = Axios(); // Note have to do this outside of conditional code blocks and hooks -> HAVING ISSUES WITH REQUESTS NOT GOING OVER NETWORK USING AXIOS

  const JWTToken = localStorage.getItem('jwtToken'); 

  // Want to fetch and render in a useEffect hook
  useEffect(()=>{
    const fetchOffers = () => {
      Axios.get('http://localhost:4040/api/loan-service/offers/', { headers: {'content-type': 'application/json', "Authorization" : `Bearer ${JWTToken}`}})
        .then((res) => {
          // console.log('full response of offers: ', res);
          // console.log('Got offers res on front-end:', res.data);
          setFetchedOffers(res.data);
          setCurrentFilteredOffers(res.data); // set both at first as no filters to start
          setMaxPageCount(Math.ceil(res.data.length / maxOffers)); // set max page count
        })
        .catch((error) => {
          console.error('Error fetching offers on front-end:', error.message);
        });
    }
    fetchOffers();
  }, []); // No dependency only running on load/mount

  // Another useEffect for paginating
  // BUG: I can't figure out why this is firing twice on each page load, keep this bug in mind
  useEffect(()=>{
    // use current count to slice which offers to display
    setDisplayedOffers(currentFilteredOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers)); // set current pagination based on counts
  }, [pageCount, currentFilteredOffers, maxPageCount]);

  // Update anytime displayed offers is modified due to filter option change
  useEffect(()=>{
    console.log("change in displayed offers detected.")
  }, displayedOffers);

  // Pagination helper methods to update state on click
  const incrementPage = () => {
    if(pageCount + 1 <= maxPageCount){
      setPageCount(pageCount + 1);
    }
  }
  const decrementPage = () => {
    if(pageCount - 1 <= 0){
      setPageCount(1);
    } else{
      setPageCount(pageCount-1);
    }
  }

  // helper method to handle incoming inputs to sort offers from FilteringOptions component
  const handleFilter =  (filterType: string) => {
    // Check which filter or sorting control called the function
    switch(filterType){
      case "amountAscend":
        sortByDollarAmountAscending();
        break;
      case "amountDescend":
        sortByDollarAmountDescending();
        break;
      case "interestAscend":
        sortByInterestAmountAscending();
        break;
      case "interestDescend":
        sortByInterestAmountDescending();
        break;
      case "dueAscend":
        sortByDueDateAscending();
        break;
      case "dueDescend":
        sortByDueDateDescending();
        break;
      case "riskLow":
        filterToRiskLevel("low");
        break;
      case "riskHigh":
        filterToRiskLevel("high");
        break;
      case "riskNeutral":
        filterToRiskLevel("neutral");
        break;
      default:
        break;
    }
  }

  // Sorting methods
  const sortByDollarAmountAscending  = () => {
    const sortedOffers = [...fetchedOffers].sort((a, b) => a.loanAmount - b.loanAmount);
    setCurrentFilteredOffers(sortedOffers);
    setDisplayedOffers(sortedOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
  };
  const sortByDollarAmountDescending = () => {
    const sortedOffers = [...fetchedOffers].sort((a, b) => b.loanAmount - a.loanAmount); 
    setCurrentFilteredOffers(sortedOffers);
    setDisplayedOffers(sortedOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
  };
  const sortByInterestAmountAscending = () => {
    const sortedOffers = [...fetchedOffers].sort((a, b) => a.interestRate - b.interestRate);
    setCurrentFilteredOffers(sortedOffers);
    setDisplayedOffers(sortedOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
  }
  const sortByInterestAmountDescending = () => {
    const sortedOffers = [...fetchedOffers].sort((a, b) => b.interestRate - a.interestRate);
    setCurrentFilteredOffers(sortedOffers);
    setDisplayedOffers(sortedOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
  }
  // Changed to using localeCompare as we are storing ISO format dates on DB and this works better than Date conversion
  const sortByDueDateAscending = () => {
    const sortedOffers = [...fetchedOffers].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    setCurrentFilteredOffers(sortedOffers);
    setDisplayedOffers(sortedOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
  };
  const sortByDueDateDescending = () => {
    const sortedOffers = [...fetchedOffers].sort((a, b) => b.dueDate.localeCompare(a.dueDate));
    setCurrentFilteredOffers(sortedOffers);
    setDisplayedOffers(sortedOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
  };
  const filterToRiskLevel = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        const highRiskOffers = fetchedOffers.filter((offer) => offer.riskLevel === "high-risk");
        setCurrentFilteredOffers(highRiskOffers);
        setDisplayedOffers(highRiskOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
        break;
      case "low":
        const lowRiskOffers = fetchedOffers.filter((offer) => offer.riskLevel === "low-risk");
        setCurrentFilteredOffers(lowRiskOffers);
        setDisplayedOffers(lowRiskOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
        break;
      case "neutral":
        setCurrentFilteredOffers(fetchedOffers);
        setDisplayedOffers(fetchedOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div id="dashboard-offers-container" className="mt-2 w-[95%] pl-1 h-screen flex flex-row items-center gap-2">
        {/* Display loaded items in a list on dashboard */}
        <ul id="dashboard-offers" className="h-[95%]  w-1/4 shadow-sm flex flex-col items-center">
          <FilteringOptions filterHandlerFunction={handleFilter}/>
          {/* Map all the loaded entries data into list items */}
          {displayedOffers.map(offer => 
            <OfferBoxItem offer={offer}/>
          )}
          <div className="text-lg">
            <div className="w-full h-fit text-white cursor-pointer flex flex-row items-center justify-center gap-4" >
              <span className="inline-block" onClick={decrementPage}><FaArrowAltCircleLeft /></span><span className="inline-block text-white">{pageCount}/{maxPageCount}</span><span className="inline-block" onClick={incrementPage}><FaArrowAltCircleRight /></span>
            </div>
          </div>
        </ul>
        <div className="w-3/4 h-full">
          <DashboardGraphics/>
        </div>
      </div>
    </>
    
    
  )
}

export default OfferBox























// No ssr optimization for this yet
// Using getServerSideProps so fetch happens each time page loads.
// export async function getServerSideProps() {
//   // console.log("getserver")
//   // try {
//   //     const res = await fetch('http://localhost:4040/api/loan-service/offers/');
//   //     const offers: Offer[] = await res.json();

//   //     return {
//   //         props: {
//   //             offers,
//   //         },
//   //     };
//   // } catch (error) {
//   //     console.error('Error fetching Offers data:', error);
//   //     return {
//   //         props: {
//   //             offers: [],
//   //         },
//   //     };
//   // }
// }













// Table library usage scrapped for now, way data is presented was too custom 
// 
 // <Table aria-label="Current" id="dashboard-offers-container" className="mt-2 w-full pl-1 flex items-center justify-center space-evenly h-screen">
    //   <TableHeader>
    //     <TableColumn>Offer Type</TableColumn>
    //     <TableColumn>User</TableColumn>
    //     <TableColumn>Amount</TableColumn>
    //     <TableColumn>Interest</TableColumn>
    //     <TableColumn>Due by</TableColumn>
    //     <TableColumn>Posted</TableColumn>
    //     <TableColumn>Term</TableColumn>
    //     <TableColumn>Installments</TableColumn>
    //     <TableColumn>Risk</TableColumn>
    //     <TableColumn>Expires</TableColumn>
    //   </TableHeader>
    //   <TableBody>
    //     {/* Display loaded offers as rows on the table */}
    //     {/* Map all the loaded entries data into list items */}
    //     {offers.map(offer => 
    //       <TableRow key={offer._id.toString()} className="mb-2 w-full p-1 text-xs text-slate-700 bg-gray-300 rounded-lg">
    //         <TableCell className="text-xl">{offer.isLoan ? "Loan Offer" : "Borrow Offer"}</TableCell>
    //         <TableCell>{offer.userId}</TableCell>
    //         <TableCell>{'$' + offer.loanAmount.toString()}</TableCell>
    //         <TableCell>{offer.interestRate.toString() + '%'}</TableCell>
    //         <TableCell>{offer.dueDate.toString().slice(0, 10)}</TableCell>
    //         <TableCell>{offer.dateOfIssue.toString().slice(0, 10)}</TableCell>
    //         <TableCell>{offer.loanTerm.toString()}</TableCell>
    //         <TableCell>{offer.numberOfInstallments.toString()}</TableCell>
    //         <TableCell>{offer.riskLevel.toString()}</TableCell>
    //         {/* Check for null on expiry date since it is optional on DB schema */}
    //         <TableCell>{offer.expiryDate ? offer.expiryDate.toString() : "No Expiration"}</TableCell> 
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>