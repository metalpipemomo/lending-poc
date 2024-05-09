import React from 'react'
// Need for navigation to loan creation page, this Link prevents resource redownlaod between page loads
import Link from 'next/link'

const MainDashPage = () => {
  return (
    <div>
      <h1>MainDashPage</h1>
      <Link href="/dashboard/create"><h1>ToLoanCreationRoute</h1></Link>
    </div>
    
  )
}

export default MainDashPage