import React from 'react'
// Need for navigation to loan creation page, this Link prevents resource redownlaod between page loads
import Link from 'next/link'
import OfferBox from '../components/OfferBox';
// Import needed for tailwind to apply and cascade down
import '../../public/styles/tailwind.css';

const MainDashPage = () => {
  return (
    <div id="dashboard-container" className="">
      <div id="dashboard-header" className="">
        <h1 id="dashboard-header-title" className="font-bold text-xl">Lending Service Dashboard</h1>
      </div>
      <Link href="/dashboard/create" id="dashboard-link-new-offer"><h2 className="my-1 w-fit bg-white p-1 text-black">Make a New Offer</h2></Link>
      <OfferBox/>
    </div>
  )
}

export default MainDashPage