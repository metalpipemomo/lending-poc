// TSX for creating loan borrows and offers
import React from 'react'
import MakeNewOffer from '../../components/MakeNewOffer'

// TODO: Should this be a drop down on the dashboard instead of a separate routed page??
const LoanEntryPage = () => {
  return (
    <div>
      <h1>LoanEntryPage</h1><br/>
      <MakeNewOffer/>
    </div>
  )
}

export default LoanEntryPage