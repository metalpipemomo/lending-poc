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
import {motion, useAnimation} from 'framer-motion';
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { TbArrowBarUp } from "react-icons/tb";

// Define an interface for explicit TS type definition according to schema
interface Offer{
  _id: ObjectId; // Does this need to be ObjectId?
  userId: string,
  loanAmount: number,
  interestRate: number,
  dueDate: Date,
  dateOfIssue: Date,
  loanTerm: number,
  numberOfInstallments: number,
  isLoan: boolean,
  riskLevel: string,
  expiryDate: Date
}

// React component for an offer loaded from the DB. Displayed on dashboard.
const OfferBox: React.FC  = () => { // explicit type on OfferBox is inferred for the prop
  // Pulled data state
  const [fetchedOffers, setFetchedOffers] = useState<Offer[]>([]);
  const [currentFilteredOffers, setCurrentFilteredOffers] = useState<Offer[]>([]);
  const [displayedOffers, setDisplayedOffers] = useState<Offer[]>([]);
  const [maxPageCount, setMaxPageCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [offerBox, setOfferBox] = useState<boolean>(true); // New offerBox state
  const maxOffers = 6;

  const [filters, setFilters] = useState({
    amount: null as 'ascending' | 'descending' | null,
    interest: null as 'ascending' | 'descending' | null,
    due: null as 'ascending' | 'descending' | null,
    risk: 'neutral' as 'low' | 'high' | 'neutral',
    type: 'neutral' as 'loan' | 'borrow' | 'neutral'
  });

  const JWTToken = localStorage.getItem('jwtToken');
  const offerSelectionController = useAnimation();
  const [offerIsOpen, setOfferIsOpen] = useState(false);
  const [offerPopState, setOfferPopState] = useState("closed");

  useEffect(() => {
    const fetchOffers = () => {
      Axios.get('http://localhost:4040/api/loan-service/offers/', {
        headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${JWTToken}`
        }
      })
        .then((res) => {
          setFetchedOffers(res.data);
          setCurrentFilteredOffers(res.data);
          setMaxPageCount(Math.ceil(res.data.length / maxOffers));
        })
        .catch((error) => {
          console.error('Error fetching offers on front-end:', error.message);
        });
    }
    fetchOffers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, pageCount]);

  useEffect(() => {
    setDisplayedOffers(currentFilteredOffers.slice((pageCount - 1) * maxOffers, (pageCount - 1) * maxOffers + maxOffers));
    setMaxPageCount(Math.ceil(currentFilteredOffers.length / maxOffers));
  }, [currentFilteredOffers]);

  const applyFilters = () => {
    let filteredOffers = [...fetchedOffers];

    if (filters.amount) {
      filteredOffers.sort((a, b) => filters.amount === 'ascending' ? a.loanAmount - b.loanAmount : b.loanAmount - a.loanAmount);
    }
    if (filters.interest) {
      filteredOffers.sort((a, b) => filters.interest === 'ascending' ? a.interestRate - b.interestRate : b.interestRate - a.interestRate);
    }
    if (filters.due) {
      filteredOffers.sort((a, b) => filters.due === 'ascending' ? a.dueDate.toString().localeCompare(b.dueDate.toString()) : b.dueDate.toString().localeCompare(a.dueDate.toString()));
    }
    if (filters.risk !== 'neutral') {
      filteredOffers = filteredOffers.filter((offer) => offer.riskLevel === (filters.risk === 'high' ? 'high-risk' : 'low-risk'));
    }
    if (filters.type !== 'neutral') {
      filteredOffers = filteredOffers.filter((offer) => offer.isLoan === (filters.type === 'loan'));
    }

    setCurrentFilteredOffers(filteredOffers);
  }

  const incrementPage = () => {
    if (pageCount + 1 <= maxPageCount) {
      setPageCount(pageCount + 1);
    }
  }
  const decrementPage = () => {
    if (pageCount - 1 <= 0) {
      setPageCount(1);
    } else {
      setPageCount(pageCount - 1);
    }
  }

  const handleFilter = (filterType: string) => {
    const newFilters = { ...filters };

    switch (filterType) {
      case "amountAscend":
        newFilters.amount = 'ascending';
        break;
      case "amountDescend":
        newFilters.amount = 'descending';
        break;
      case "interestAscend":
        newFilters.interest = 'ascending';
        break;
      case "interestDescend":
        newFilters.interest = 'descending';
        break;
      case "dueAscend":
        newFilters.due = 'ascending';
        break;
      case "dueDescend":
        newFilters.due = 'descending';
        break;
      case "riskLow":
        newFilters.risk = 'low';
        break;
      case "riskHigh":
        newFilters.risk = 'high';
        break;
      case "riskNeutral":
        newFilters.risk = 'neutral';
        break;
      case "borrow":
        newFilters.type = newFilters.type === 'borrow' ? 'neutral' : 'borrow';
        break;
      case "loan":
        newFilters.type = newFilters.type === 'loan' ? 'neutral' : 'loan';
        break;
      case "all":
        newFilters.amount = null;
        newFilters.interest = null;
        newFilters.due = null;
        newFilters.risk = 'neutral';
        newFilters.type = 'neutral';
        setCurrentFilteredOffers(fetchedOffers);  // Reset to show all offers
        setPageCount(1); // Reset to the first page
        break;
      default:
        break;
    }
    setFilters(newFilters);
  }

  const processAnim = (controllerName: string) => {
    switch (controllerName) {
      case 'offer':
        if (offerPopState === 'closed') {
          setOfferPopState('open');
          offerSelectionController.start('open');
        } else {
          setOfferPopState('closed');
          offerSelectionController.start('closed');
        }
        break;
      case 'loan':
        if (offerPopState === 'closed') {
          setOfferPopState('open');
          offerSelectionController.start('open');
          handleFilter('loan');
        } else {
          setOfferPopState('closed');
          offerSelectionController.start('closed');
          handleFilter('borrow');
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div id="dashboard-offers-container" className="mt-2 w-[95%] pl-1 h-screen flex flex-row items-center justify-center">
        {/* Display loaded items in a list on dashboard */}
        <ul id="dashboard-offers" className="h-[95%]  w-1/4 shadow-sm flex flex-col items-center relative">
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
          <motion.span id="h-fit dashboard-offers-offer-filter" 
              className="absolute right-2 bottom-2 text-white w-1/4 pt-9 mb-8  flex flex-row items-center justify-center" 
                onHoverStart={offerIsOpen ? ()=>{} : ()=>{processAnim("offer"); setOfferIsOpen(true)}} 
                onHoverEnd={offerIsOpen ? ()=>{processAnim("offer"); setOfferIsOpen(false)} : ()=> {}}
            >
              <motion.span 
                className="absolute w-full h-fit bg-slate-50 bottom-8 rounded-xl flex flex-row justify-evenly items-center z-10 mx-2"
                variants={offerSelectionPopupVariant}
                initial="closed"
                animate={offerSelectionController}
              >
                <span className="text-lg text-black cursor-pointer z-10" onClick={()=>{handleFilter("borrow")}}>Borrow</span><span className="text-lg cursor-pointer z-10 text-black " onClick={()=>{handleFilter("loan")}}>Loan</span>
                <span className="text-2xl text-white absolute top-3 z-0"><TbTriangleInvertedFilled /></span>
              </motion.span>
              <motion.span 
                className="inline-block pr-1 mt-1 text-xl"
              >
                <TbArrowBarUp />
              </motion.span>
              <motion.span className="inline-block text-xl">Type</motion.span>
            </motion.span>
        </ul>

        {/* Scrapped data visualization aspect due to time constraints */}
        {/* <div className="w-3/4 h-full">
          <DashboardGraphics currentOffers={currentFilteredOffers}/>
        </div> */}
      </div>
    </>
    
    
  )
}

export default OfferBox

const offerSelectionPopupTiming = 0.2;
const offerSelectionPopupVariant = {
  open: {
    opacity: 1,
    transition: { duration: offerSelectionPopupTiming },
  },
  closed: {
    opacity: 0,
    transition: { duration: offerSelectionPopupTiming },
  },
};







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