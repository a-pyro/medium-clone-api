import { Router } from 'express';
import {
  logoutHandler,
  loginHandler,
  registrationHandler,
} from '../controllers/auth.js';

const router = Router();

router.route('/register').post(registrationHandler);
router.route('/login').post(loginHandler);
router.route('/logout').post(logoutHandler);
router.route('/refreshToken').post(registrationHandler);

export default router;
