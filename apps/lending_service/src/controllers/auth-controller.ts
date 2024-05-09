import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserModel, { User } from '../models/user-model';

const scryptAsync = promisify(scrypt);

const HashPassword = async (password: string): Promise<string> => {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = await scryptAsync(password, salt, 64) as Buffer;
    return `${salt}:${derivedKey.toString('hex')}`;
};

const VerifyPassword = async (storedHash: string, givenPassword: string): Promise<boolean> => {
    const [salt, key] = storedHash.split(':');
    const derivedKeyBuffer = await scryptAsync(givenPassword, salt, 64) as Buffer;
    const keyHex = derivedKeyBuffer.toString('hex');
    return key === keyHex;
}

const FindUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await UserModel.findOne({ email }).exec();
        return user as User;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

const CreateUser = async (user: User): Promise<User | null> => {
    try {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return savedUser as User;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body as User;

    try {
        const user = await FindUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const match = await VerifyPassword(user.password, password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({ error: 'Server error: .env variables not loaded properly' });
        }

        const payload = { id: user.email };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const Signup = async (req: Request, res: Response) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        creditScore,
        address,
        createdLoans
    } = req.body as User;

    try {
        const existing = await FindUserByEmail(email);
        if (existing) {
            return res
                .status(409)
                .json({ error: 'Account already exists with provided email' });
        }

        const hashedPassword = await HashPassword(password); 

        // Do not store raw, change later
        const user: User = {
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            creditScore,
            address,
            createdLoans
        };

        const registered = await CreateUser(user);
        if (!registered) {
            return res.status(500).json({ error: 'Failed to create user' });
        }

        return res.status(201).json({ message: 'User registered' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};