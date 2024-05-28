// TSX for creating loan borrows and offers
import React from 'react';
import Link from 'next/link';
import MatchBox from '../../components/MatchBox';
import '../../../public/styles/tailwind.css';

// TODO: Finish matches page UI
// Need to pull matches for the current logged in user using userID decoded from JWT
// Need to allow accept/reject for available matches
const ViewMatchesPage = () => {
  return (
    <>
      <div id="matches-container" className="">
        {/* TODO: The header used in all the separate pages should be an importable component as it is used everywhere */}
        <div id="matches-header" className="flex justify-between w-full h-fit p-1.5 pl-3 text-slate-700 bg-gray-50">
          <Link href="/"><h1 className="text-2xl">Lending Service POC</h1></Link>
          {/* Nav button should also be an imported component used in the imported header component */}
          <Link href="/dashboard" id="matches-link-back" className="w-[142px] px-3 py-2 text-sm font-semibold rounded-full shadow-sm border border-black bg-black text-center text-white hover:bg-gray-300 hover:text-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2"><h2 className="">Offer Dashboard</h2></Link>
        </div>
        {/* Add match page UI here */}
        <MatchBox/>
      </div>
    </>
  )
}

export default ViewMatchesPage