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

const router = Router();

router.post('/register', validateResult(registerValidator), registerUser);
router.post('/login', validateResult(loginValidator), loginUser);

router.get('/google', redirectToGoogleOauth);
router.get('/google/callback', googleOauthCallback);

export default router;
