import { LoanModel, Match, MatchModel } from '@repo/models'; // Import your models
import { Kafka } from 'kafkajs'; // Import kafkajs

// Initialize Kafka producer
const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['localhost:9093']
});

const producer = kafka.producer();

export async function findMatches() {
  await producer.connect();
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
        const match = {
          loanerId: loanOffer.userId,
          borrowerId: borrowRequest.userId,
          loanId: loanOffer._id,
          borrowId: borrowRequest._id,
          status: 'pending_match'
        };
        matches.push(match);
      }
    });
  });
  console.log('Matches to be inserted:', matches);
  await MatchModel.insertMany(matches);
  console.log(`${matches.length} matches inserted into the database.`);
  
  for (const match of matches) {
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: JSON.stringify(match) }
      ]
    });
  }

  console.log('All matches sent to Kafka broker.');

  await producer.disconnect();
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


