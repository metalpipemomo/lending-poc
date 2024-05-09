// By default want to render most of react on server but we offload small isolated interactive parts to render in client
// Browser events like click and drag won't work unless it's client rendered
// This is the NextJS directive that flags a component to be rendered on client
'use client';
import React from 'react'

const MakeNewOffer = () => {
  return (
    <div>
      <button onClick={()=>{console.log('Click')}}>Make a New Offer</button>
    </div>
  )
}

export default MakeNewOffer