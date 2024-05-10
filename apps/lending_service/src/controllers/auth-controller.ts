import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { v4 as uuidv4 } from 'uuid';

import { UserModel, User } from '@repo/models';

const scryptAsync = promisify(scrypt);

const HashPassword = async (password: string): Promise<string> => {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString('hex')}`;
};

const VerifyPassword = async (
    storedHash: string,
    givenPassword: string
): Promise<boolean> => {
    const [salt, key] = storedHash.split(':');
    const derivedKeyBuffer = (await scryptAsync(
        givenPassword,
        salt,
        64
    )) as Buffer;
    const keyHex = derivedKeyBuffer.toString('hex');
    return key === keyHex;
};

const VerifyPhoneNumber = (
    countryCode: string,
    phoneNumber: string
): boolean => {
    const phoneUtil = PhoneNumberUtil.getInstance();

    try {
        const number = phoneUtil.parse(phoneNumber, countryCode);
        return phoneUtil.isValidNumber(number);
    } catch (error) {
        console.error('Failed to parse or validate the phone number:', error);
        return false;
    }
};

const VerifyPasswordStrength = (password: string): boolean => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{14,}$/;
    return regex.test(password);
};

const FindUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await UserModel.findOne({ email }).exec();
        return user as User;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

const FindUserByPhone = async (phone: string): Promise<User | null> => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phone }).exec();
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

export const LoginByEmail = async (req: Request, res: Response) => {
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
            return res
                .status(500)
                .json({
                    error: 'Server error: .env variables not loaded properly'
                });
        }

        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const LoginByPhone = async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body as User;

    try {
        const user = await FindUserByPhone(phoneNumber);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const match = await VerifyPassword(user.password, password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            return res
                .status(500)
                .json({
                    error: 'Server error: .env variables not loaded properly'
                });
        }

        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const Signup = async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        email,
        password,
        countryCode,
        phoneNumber,
        creditScore,
        streetAddress,
        province,
        postalCode,
        city,
        country
    } = req.body as User;

    try {
        const existingEmail = await FindUserByEmail(email);
        if (existingEmail) {
            return res
                .status(409)
                .json({ error: 'Account already exists with provided email' });
        }

        const existingPhone = await FindUserByPhone(phoneNumber);
        if (existingPhone) {
            return res
                .status(409)
                .json({
                    error: 'Account already exists with provided phone number'
                });
        }

        const isValidPhoneNumber = VerifyPhoneNumber(countryCode, phoneNumber);
        if (!isValidPhoneNumber) {
            return res
                .status(400)
                .json({
                    error: 'Phone number is not compatible with country code'
                });
        }

        const isStrongPassword = VerifyPasswordStrength(password);
        if (!isStrongPassword) {
            if (!isStrongPassword) {
                return res
                    .status(400)
                    .json({ error: 'Password is not strong enough' });
            }
        }

        const hashedPassword = await HashPassword(password);

        // Do not store raw, change later
        const user: User = {
            id: uuidv4(),
            firstName,
            lastName,
            email,
            countryCode,
            password: hashedPassword,
            phoneNumber,
            creditScore,
            streetAddress,
            province,
            postalCode,
            city,
            country,
            role: 'USER'
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

export const AuthenticateRoutes = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.path.startsWith('/api/auth')) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res
                .status(401)
                .json({ error: 'Access forbidden: Token not provided' });
        }

        if (!process.env.SECRET_KEY) {
            return res
                .status(500)
                .json({
                    error: 'Server error: .env variables not loaded properly'
                });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Token expired' });
                } else {
                    return res.status(403).json({ error: 'Invalid token' });
                }
            }

            const payload = decoded as jwt.JwtPayload;
            if (!payload.id) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            req.user = { id: payload.id };
            next();
        });
    } else {
        next();
    }
};
