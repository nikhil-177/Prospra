import { Router } from 'express';
import { registerUser } from './register/register.controller.js';
import { validateResult } from '../../shared/middlewares/validateResult.middleware.js';
import { registerValidator } from './register/register.validator.js';
import { loginValidator } from './login/login.validator.js';
import { loginUser } from './login/login.controller.js';

const router = Router();

router.post('/register', validateResult(registerValidator), registerUser);
router.post('/login', validateResult(loginValidator), loginUser);

export default router;
