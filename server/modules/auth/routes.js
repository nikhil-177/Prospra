import { Router } from 'express';
import { registerUser } from './register/register.controller.js';
import { validateResult } from '../../shared/middlewares/validateResult.middleware.js';
import { registerValidator } from './register/register.validator.js';
import { loginValidator } from './login/login.validator.js';
import { loginUser } from './login/login.controller.js';
import {
  redirectToGoogleOauth,
  googleOauthCallback,
} from './googleAuth/googleAuth.controller.js';
import { refreshingTheTokens } from './refreshToken/refreshTokens.controller.js';
import { isAuthenticated } from '../../shared/middlewares/auth.middleware.js';
import { logoutUser } from './logout/logout.controller.js';
import { checkIfExists } from './checkUser/userCheck.controller.js';
import {
  checkEmailAndGenerateOtp,
  resetPassword,
  verifyOtpAndReturnTempToken,
} from './forgotPassword/forgot.controller.js';
import { verifyEmailWithOtpCode } from './emailVerify/emailVerify.controller.js';

const router = Router();

router.post('/register', validateResult(registerValidator), registerUser);
router.post('/login', validateResult(loginValidator), loginUser);

router.get('/google', redirectToGoogleOauth);
router.get('/google/callback', googleOauthCallback);

router.get('/refresh-token', refreshingTheTokens);
router.post('/logout', isAuthenticated, logoutUser);

router.get('/check-user', checkIfExists);

router.post('/forgot-password', checkEmailAndGenerateOtp);
router.post('/verify-otp', verifyOtpAndReturnTempToken);
router.post('/reset-password', resetPassword);

router.post('/verify-email', isAuthenticated, verifyEmailWithOtpCode);

export default router;
