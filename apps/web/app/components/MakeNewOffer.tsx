// By default want to render most of react on server but we offload small isolated interactive parts to render in client
// Browser events like click and drag won't work unless it's client rendered
// This is the NextJS directive that flags a component to be rendered on client
'use client';
import React from 'react'

const MakeNewOffer = () => {
  return (
    <div>
      <form className="w-fit border border-white bg-gray-700 text-white hover:bg-gray-800 ">
        <input type="text" name="test"></input>
        <button className="bg-white p-1 text-black" onClick={()=>{console.log('Click')}}>Post Offer</button>
      </form>
    </div>
  )
}

export default MakeNewOffer