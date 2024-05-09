import express from "express";
import { Login, Signup } from "../controllers/auth-controller";

const router = express.Router();

/**
 * TODO:
 * - Adjust schema to have password (COMPLETE)
 * - Use User schema instead of User type (COMPLETE)
 * - Integrate database actions into the FindUserByEmail and CreateUser (COMPLETE)
 * - Use crypto for password matching (COMPLETE)
 * - Port to controller and keep just routes here (COMPLETE)
 */

router.post('/login', Login);
router.post('/signup', Signup);

export default router;
