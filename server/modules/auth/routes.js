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

const router = Router();

router.post('/register', validateResult(registerValidator), registerUser);
router.post('/login', validateResult(loginValidator), loginUser);

router.get('/google', redirectToGoogleOauth);
router.get('/google/callback', googleOauthCallback);

router.get('/refresh-token', refreshingTheTokens);
router.post('/logout', isAuthenticated,logoutUser);

export default router;
