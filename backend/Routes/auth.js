import express from 'express';
import {register,login,refreshAccessToken} from '../Controllers/authController.js';
import { isValidResetPasswordToken } from "../auth/verifyToken.js";

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post("/refresh-token", refreshAccessToken);
// router.post("/forget-password", forgetPassword);
// router.post("/reset-password/:id", isValidResetPasswordToken, resetPassword);

export default router;