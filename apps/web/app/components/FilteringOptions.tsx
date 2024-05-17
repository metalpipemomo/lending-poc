import React from 'react'
import { FaArrowDown } from "react-icons/fa";
import { MdOutlineDangerous } from "react-icons/md";

const FilteringOptions = ({ filterHandlerFunction }: { filterHandlerFunction: Function}) => {
  return (
    <div id="dashboard-offers-filtering-options" className="w-[95%] h-8 flex flex-row items-center justify-between">
      <span id="dashboard-offers-amount-sort" className="w-1/4 text-white flex flex-row items-center justify-center">
        <span className="inline-block pr-1 p-2 text-md cursor-pointer"><FaArrowDown /></span>
        <span className="inline-block cursor-pointer text-xl">Amount</span>
      </span>
      <span id="dashboard-offers-interest-sort" className="w-1/4 text-white flex flex-row items-center justify-center">
        <span className="inline-block pr-1 p-2 text-md cursor-pointer"><FaArrowDown /></span>
        <span className="inline-block cursor-pointer text-xl">Interest</span>
      </span>
      <span id="dashboard-offers-duedate-sort" className="w-1/4 text-white flex flex-row items-center justify-center">
        <span className="inline-block pr-1 p-2 text-md cursor-pointer"><FaArrowDown /></span>
        <span className="inline-block cursor-pointer text-xl">Due by</span>
      </span>
      <span id="dashboard-offers-risk-filter" className="w-1/4 text-white flex flex-row items-center justify-center">
        <span className="inline-block pr-1 text-2xl cursor-pointer"><MdOutlineDangerous /></span>
        <span className="inline-block cursor-pointer text-xl">Risk</span>
      </span>
    </div>
  )
}

export default FilteringOptions