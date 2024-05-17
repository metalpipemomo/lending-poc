'use client'
import React, { useState } from 'react'
import { FaArrowDown } from "react-icons/fa";
import { MdOutlineDangerous } from "react-icons/md";
import { motion, useAnimationControls, useAnimation } from 'framer-motion';
import { TbTriangleInvertedFilled } from "react-icons/tb";

const FilteringOptions = ({ filterHandlerFunction }: { filterHandlerFunction: Function}) => {
  // To track current state of filter/sorting options
  const [amountState, setAmountState] = useState("descending");
  const [interestState, setInterestState] = useState("descending");
  const [dueState, setDueState] = useState("descending");
  const [riskState, setRiskState] = useState("closed");
  const [riskPopState, setRiskPopState] = useState("closed");
  const [riskIsOpen, setRiskIsOpen] = useState(false);

  // Animation controllers for flipping arrows according to sorting state
  const amountController = useAnimation();
  const interestController = useAnimation();
  const dueController = useAnimation();
  const riskController = useAnimation();
  const riskSelectionController = useAnimation();

  // State and anim transition handling for filtering/sorting inputs
  const processAnim = (controllerName: string) => {
    switch (controllerName) {
      case 'amount':
        if (amountState === 'descending') {
          setAmountState('ascending');
          amountController.start('ascending');
        } else {
          setAmountState('descending');
          amountController.start('descending');
        }
        break;
      case 'interest':
        if (interestState === 'descending') {
          setInterestState('ascending');
          interestController.start('ascending');
        } else {
          setInterestState('descending');
          interestController.start('descending');
        }
        break;
      case 'due':
        if (dueState === 'descending') {
          setDueState('ascending');
          dueController.start('ascending');
        } else {
          setDueState('descending');
          dueController.start('descending');
        }
        break;
      case 'risk':
        if (riskPopState === 'closed') {
          setRiskPopState('open');
          riskSelectionController.start('open');
        } else {
          setRiskPopState('closed');
          riskSelectionController.start('closed');
        }
        break;
      case 'high':
        if(riskState === 'high'){
          setRiskState("neutral")
          riskController.start("neutral")
        } else {
          setRiskState("high")
          riskController.start("high")
        }
        break;
      case 'low':
        if(riskState === 'low'){
          setRiskState("neutral")
          riskController.start("neutral")
        } else {
          setRiskState("low")
          riskController.start("low")
        }
        break;
      default:
        break;
    }
  };

  return (
    <motion.div id="dashboard-offers-filtering-options" className="w-[95%] h-8 flex flex-row items-center justify-between">
      <motion.span id="dashboard-offers-amount-sort" className="w-1/4 text-white flex flex-row items-center justify-center " onClick={()=>{processAnim("amount")}}>
        <motion.span 
          className="inline-block pr-1 p-2 text-md cursor-pointer"
          variants={iconFlipVariant}
          initial="descending"
          animate={amountController}
        >
          <FaArrowDown />
        </motion.span>
        <motion.span className="inline-block cursor-pointer text-xl">Amount</motion.span>
      </motion.span>
      <motion.span id="dashboard-offers-interest-sort" className="w-1/4 text-white flex flex-row items-center justify-center" onClick={()=>{processAnim("interest")}}>
        <motion.span 
          className="inline-block pr-1 p-2 text-md cursor-pointer"
          variants={iconFlipVariant}
          initial="descending"
          animate={interestController}
        >
          
          <FaArrowDown />
        </motion.span>
        <motion.span className="inline-block cursor-pointer text-xl">Interest</motion.span>
      </motion.span>
      <motion.span id="dashboard-offers-duedate-sort" className="w-1/4 text-white flex flex-row items-center justify-center" onClick={()=>{processAnim("due")}}>
        <motion.span 
          className="inline-block pr-1 p-2 text-md cursor-pointer"
          variants={iconFlipVariant}
          initial="descending"
          animate={dueController}
        >
          <FaArrowDown />
        </motion.span>
        <motion.span className="inline-block cursor-pointer text-xl">Due by</motion.span>
      </motion.span>
      <motion.span id="dashboard-offers-risk-filter" 
        className="relative w-1/4 pt-9 mb-8 text-white flex flex-row items-center justify-center" 
          onHoverStart={riskIsOpen ? ()=>{} : ()=>{processAnim("risk"); setRiskIsOpen(true)}} 
          onHoverEnd={riskIsOpen ? ()=>{processAnim("risk"); setRiskIsOpen(false)} : ()=> {}}
      >
        <motion.span 
          className="absolute w-full h-fit bg-slate-50 bottom-8 rounded-xl flex flex-row justify-evenly z-10"
          variants={riskSelectionPopupVariant}
          initial="closed"
          animate={riskSelectionController}
        >
          <span className="text-[#00FF21] text-lg cursor-pointer z-10" onClick={()=>{processAnim("low")}}>Low</span><span className="text-[#FF0000] text-lg cursor-pointer z-10" onClick={()=>{processAnim("high")}}>High</span>
          <span className="text-2xl text-white absolute top-3 z-0"><TbTriangleInvertedFilled /></span>
        </motion.span>
        <motion.span 
          className="inline-block pr-1 text-2xl"
          variants={riskSelectionVariant}
          initial="neutral"
          animate={riskController}
        >
          <MdOutlineDangerous />
        </motion.span>
        <motion.span className="inline-block text-xl">Risk</motion.span>
      </motion.span>
    </motion.div>
  )
}

export default FilteringOptions

// Defining animations using framer-motion
const iconFlipVariant = {
  ascending: { rotate: 180 },
  descending: { rotate: 0 },
  none: { rotate: 90 }
}
const riskSelectionPopupTiming = 0.2;
const riskSelectionVariant = {
  low: {
    color: '#00FF21', 
    transition: { duration: riskSelectionPopupTiming },
  },
  high: {
    color: 'red',
    transition: { duration: riskSelectionPopupTiming },
  },
  neutral: {
    color: 'white',
    transition: { duration: riskSelectionPopupTiming },
  },
};
const riskSelectionPopupVariant = {
  open: {
    opacity: 1,
    transition: { duration: riskSelectionPopupTiming },
  },
  closed: {
    opacity: 0,
    transition: { duration: riskSelectionPopupTiming },
  },
};
