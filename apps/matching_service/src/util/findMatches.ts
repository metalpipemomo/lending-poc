import { LoanModel, Match, MatchModel } from '@repo/models'; // Import your models

export async function findMatches() {
  // Fetch all loan offers and borrowing requests
  const loanOffers = await LoanModel.find({ isLoan: "true" });
  const borrowRequests = await LoanModel.find({ isLoan: "false" });
  

  const matches: Match[] = [];

  loanOffers.forEach(loanOffer => {
    borrowRequests.forEach(borrowRequest => {
      if (
        borrowRequest.loanAmount <= loanOffer.loanAmount &&
        borrowRequest.loanAmount >= loanOffer.loanAmount * 0.7 && // check if borrow offer is within 30% of loan offer
        borrowRequest.interestRate >= loanOffer.interestRate &&
        borrowRequest.loanTerm <= loanOffer.loanTerm &&
        borrowRequest.riskLevel === loanOffer.riskLevel &&
        new Date(borrowRequest.dueDate) <= new Date(loanOffer.dueDate)
      ) {
        // Create a match
        matches.push({
          loanerId: loanOffer.userId,
          borrowerId: borrowRequest.userId,
          loanId: loanOffer._id,
          borrowId: borrowRequest._id,
          status: 'pending_match'
        });
      }
    });
  });
  console.log('Matches to be inserted:', matches);
  await MatchModel.insertMany(matches);
  console.log(`${matches.length} matches inserted into the database.`);
}


// {
//   "$or": [
//     { "_id": ObjectId("664665d66b0e4b833003c98b") },
//     { "_id": ObjectId("664665d66b0e4b833003c99c") }
//   ]
// }

// {
//   "$or": [
//     { "_id": ObjectId("664665d66b0e4b833003c9ae") },
//     { "_id": ObjectId("664665d66b0e4b833003c99c") }
//   ]
// }


