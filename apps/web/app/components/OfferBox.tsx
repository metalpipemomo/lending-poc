import React from 'react'

// React component for an offer loaded from the DB. Displayed on dashboard.
const OfferBox = async () => {
  // FETCH test with dummy link
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');

  return (
    <div className="h-fit w-3/4 bg-white text-black">
      Fetch and load DB entries here on load, this should be server side rendered component since its just initial batch read and no interactive requirements
    </div>
  )
}

export default OfferBox