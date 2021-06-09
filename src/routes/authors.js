import { Router } from 'express';
import {
  getAuthors,
  addAuthor,
  getAuthor,
  editAuthor,
  deleteAuthor,
  getPersonalProfile,
} from '../controllers/authors.js';
import { jwtAuthMiddleware } from '../middlewares/auth/index.js';

const router = Router();

// router.route('/register').post(addAuthor);

router.route('/me').get(jwtAuthMiddleware, getPersonalProfile).put(editAuthor);

router.route('/').get(getAuthors);

router.route('/:id').get(jwtAuthMiddleware, getAuthor).delete(deleteAuthor);

export default router;
