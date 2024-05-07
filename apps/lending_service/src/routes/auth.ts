import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * TODO:
 * - Adjust schema to have password
 * - Use User schema instead of User type
 * - Integrate database actions into the FindUserByEmail and CreateUser
 * - Use bcrypt (or some other encryption) for password matching
 */


type User = {
    email: string,
    password: string
};

const FindUserByEmail = async (email: string): Promise<User | null> => {

    return null;
}

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body as User;

    try {
        const user = await FindUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const match = password === user.password;
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const payload = { id: user.email };
        const token = jwt.sign(payload, 'somesecretkey', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

const CreateUser = async (user: User): Promise<User> => {

    return user;
}

router.post("/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body as User;

    try {
        const existing = await FindUserByEmail(email);
        if (existing) {
            return res.status(409).json({ error: "Account already exists with provided email" });
        }

        // Do not store raw, change later
        const user: User = {
            email,
            password
        };

        const registered = await CreateUser(user);
        
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;