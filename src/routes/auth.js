import { Router } from 'express';
import { loginHandler, registrationHandler } from '../controllers/auth.js';

const router = Router();

router.route('/register').post(registrationHandler);
router.route('/login').post(loginHandler);
router.route('/refreshToken').post(registrationHandler);

export default router;
