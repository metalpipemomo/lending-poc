import React from 'react'
// Need for navigation to loan creation page, this Link prevents resource redownlaod between page loads
import Link from 'next/link'
import OfferBox from '../components/OfferBox';
// Import needed for tailwind to apply and cascade down
import '../../public/styles/tailwind.css';

const MainDashPage = () => {
  return (
    <div id="dashboard-container" className="">
      <div id="dashboard-header" className="flex">
        <h1 id="dashboard-header-title" className="p-1 text-3xl font-bold">Lending Service Dashboard</h1>
        <Link href="/dashboard/create" id="dashboard-link-new-offer" className="place-self-end"><h2 className="my-1 w-fit border border-white bg-gray-700 p-1 text-white hover:bg-gray-800">Make a New Offer</h2></Link>
      </div>
      <OfferBox/>
    </div>
  )
}

export default MainDashPage