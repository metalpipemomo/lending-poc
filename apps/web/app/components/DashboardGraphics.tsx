// TODO: Will use recharts to visualize db data for users on dashboard
'use client'
import React, {useEffect, useState} from 'react'
import { ObjectId } from 'mongodb';

// Define an interface for explicit TS type definition according to schema
interface Offer{
  _id: ObjectId; // Does this need to be ObjectId?
  userId: string,
  loanAmount: number,
  interestRate: number,
  dueDate: string,
  dateOfIssue: string,
  loanTerm: number,
  numberOfInstallments: number,
  isLoan: boolean,
  riskLevel: string,
  expiryDate: string
}

const DashboardGraphics: React.FC<{ currentOffers: Offer[] }> = ({ currentOffers }) => {
  // Local state for updating and rendering graphing values
  const [averageInterest, setAverageInterest] = useState(0);
  const [loanCount, setLoanCount] = useState(0);
  const [borrowCount, setBorrowCount] = useState(0);
  const [highRiskCount, setHighRiskCount] = useState(0);
  const [lowRiskCount, setLowRiskCount] = useState(0);
  const [blackListCount, setBlackListCount] = useState(0);

  useEffect(()=>{
    // Count how many borrows and loans there are
    const loanOffers = currentOffers.filter((offer) => offer.isLoan);
    const borrowOffers = currentOffers.filter((offer) => !offer.isLoan);
    setLoanCount(loanOffers.length);
    setBorrowCount(borrowOffers.length);
    // Count how many high-risk, low-risk, black-listed entries there are
    const highRiskOffers = currentOffers.filter((offer) => offer.riskLevel === 'high');
    const lowRiskOffers = currentOffers.filter((offer) => offer.riskLevel === 'low');
    const blackListedOffers = currentOffers.filter((offer) => offer.riskLevel === 'blackList');
    setHighRiskCount(highRiskOffers.length);
    setLowRiskCount(lowRiskOffers.length);
    setBlackListCount(blackListedOffers.length);
    // Calculate the average interest of the current set
    const totalInterest = currentOffers.reduce((sum, offer) => sum + offer.interestRate, 0);
    const averageInterest = totalInterest / currentOffers.length;
    setAverageInterest(averageInterest);
    // Calculate amounts history
    // Calculate risk dist
    // Calculate amount dist
  }, [currentOffers])

  return (
    <div className="flex justify-center inline-block w-full h-full text-slate-700">
      <div className="w-full h-[95%] flex items-center justify-center">
        <div className="text-slate-700 bg-gray-50 w-full h-[95%] rounded-lg">
          {/* <div id="dashboard-charts-first-quadrant" className="border-green-700 border-2">
            <div>
              Average Interest
            </div>
            <div>
              Loan Amounts History
            </div>
          </div>
          <div id="dashboard-charts-second-quadrant" className="border-red-700 border-2">
            <div>
              Offer availability
            </div>
          </div>
          <div id="dashboard-charts-third-quadrant" className="border-blue-700 border-2">
            <div>
              Risk distribution
            </div>
          </div>
          <div id="dashboard-charts-fourth-quadrant" className="border-yellow-700 border-2">
            <div>
              Amount distributiion
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default DashboardGraphics