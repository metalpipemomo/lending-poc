import React from 'react'
// Need for navigation to loan creation page, this Link prevents resource redownlaod between page loads
import Link from 'next/link'
import OfferBox from '../components/OfferBox';
// Import needed for tailwind to apply and cascade down
import '../../public/styles/tailwind.css';

const MainDashPage = () => {
  return (
    <>
      {/* quick way to do background from auth page this messes with other colors*/}
      <div id="dashboard-container" className="flex flex-col">
        <div id="dashboard-header" className="flex justify-between w-full h-fit p-1.5 pl-3 text-slate-700 bg-white">
          <h1 className="text-2xl">Lending Service POC</h1>
          <Link href="/dashboard/create" id="dashboard-link-new-offer" className="w-fit px-3 py-2 text-sm font-semibold rounded-full shadow-sm  bg-black text-white hover:bg-gray-300 hover:text-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2"><h2 className="">Make a New Offer</h2></Link>
        </div>
        <OfferBox/>
      </div>
    </>
  )
}

export default MainDashPage