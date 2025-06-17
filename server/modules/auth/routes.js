import { Router } from 'express';
import { registerUser } from './register/register.controller.js';
import { validateResult } from '../../shared/middlewares/validateResult.middleware.js';
import { registerValidator } from './register/register.validator.js';

const router = Router();

router.post('/register', validateResult(registerValidator), registerUser);

export default router;
