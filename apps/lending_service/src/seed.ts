import 'dotenv/config'
import { UserModel, User, LoanModel, Loan } from '@repo/models';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

async function connect() {
    await mongoose.connect(process.env.MONGO_URI!, { dbName: 'Loans' });

    console.log('Database connection established...');
}

async function clear() {
    await UserModel.deleteMany({});
    await LoanModel.deleteMany({});

    console.log('All entries have been cleared...');
}

async function seed() {
    const users: User[] = [];
    const loans: Loan[] = [];

    for (let i = 0; i < 50; i++) {
        const user: User = {
            id: uuidv4(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            countryCode: faker.location.countryCode(),
            phoneNumber: faker.string.numeric(10),
            province: faker.location.state(),
            streetAddress: faker.location.streetAddress(),
            postalCode: faker.location.zipCode(),
            country: faker.location.country(),
            city: faker.location.city(),
            creditScore: faker.number.int({ min: 300, max: 850 }),
            role: 'USER'
        };

        users.push(user);

        const loan: Loan = {
            userId: user.id,
            loanAmount: faker.number.int({ min: 1000, max: 50000 }),
            interestRate: faker.number.float({ min: 1, max: 20, fractionDigits: 2 },),
            dueDate: faker.date.future(),
            dateOfIssue: new Date(),
            loanTerm: faker.number.int({ min: 6, max: 60 }),
            numberOfInstallments: faker.number.int({ min: 1, max: 12 }),
            isLoan: faker.datatype.boolean(),
            riskLevel: ['low-risk', 'high-risk', 'black-listed'][Math.floor(Math.random() * 3)],
            expiryDate: faker.datatype.boolean() ? faker.date.future() : undefined,
        };

        loans.push(loan);
    }

    await UserModel.insertMany(users);
    await LoanModel.insertMany(loans);

    console.log(`User seeding complete...`);
}

async function run() {
    try {
        await connect();
        await clear();
        await seed();
    } catch (error) {
        console.error(`Error seeding: ${error}`);
    } finally {
        await mongoose.disconnect();
        console.log(`Database connection cleaned up...`);
    }
}

run();