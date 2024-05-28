// TSX for creating loan borrows and offers
import React from 'react';
import MakeNewOffer from '../../components/MakeNewOffer';
import Link from 'next/link'
// Something wrong with my tailwind file location it has to be imported in each tsx file, ask mo how he used it on his branch
import '../../../public/styles/tailwind.css';

// TODO: Should this be a drop down on the dashboard instead of a separate routed page??
const LoanEntryPage = () => {
  return (
    <>
      <div id="offer-creation-container" className="">
        <div id="dashboard-create-header" className="flex justify-between w-full h-fit p-1.5 pl-3 text-slate-700 bg-gray-50">
          <Link href="/"><h1 className="text-2xl">Lending Service POC</h1></Link>
          <Link href="/dashboard" id="dashboard-create-link-back" className="w-[142px] px-3 py-2 text-sm font-semibold rounded-full shadow-sm border border-black bg-black text-center text-white hover:bg-gray-300 hover:text-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2"><h2 className="">Offer Dashboard</h2></Link>
        </div>
        <MakeNewOffer/>
      </div>
    </>
  )
}

export default LoanEntryPage