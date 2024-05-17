import React from 'react'

const DashboardGraphics = () => {
  return (
    <div className="flex justify-center inline-block w-full h-full">
      {/*BUG: No idea why the bounds of this div goes past the viewport, have to make 95 percent to center divs as it should be without overbounds bug */}
      <div className="w-full h-[95%] flex items-center justify-center">
        <div className="text-slate-700 bg-gray-50 w-full h-[95%] rounded-lg">

        </div>
      </div>
    </div>
  )
}

export default DashboardGraphics