// TSX for creating loan borrows and offers
import React from 'react'
import MakeNewOffer from '../../components/MakeNewOffer'

// TODO: Should this be a drop down on the dashboard instead of a separate routed page??
const LoanEntryPage = () => {
  return (
    <div id="offer-creation-container">
      <div id="dashboard-header" className="">
        <h1 id="dashboard-header-title" className="p-1 text-3xl font-bold">LoanEntryPage</h1>
      </div>
      <MakeNewOffer/>
    </div>
  )
}

export default LoanEntryPage