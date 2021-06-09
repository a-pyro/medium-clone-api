import { Router } from 'express';
import {
  getAuthors,
  addAuthor,
  getAuthor,
  editAuthor,
  deleteAuthor,
} from '../controllers/authors.js';
import { basicAuthMiddleware } from '../middlewares/auth/index.js';

const router = Router();

router.route('/register').post(addAuthor);

router.route('/').get(basicAuthMiddleware, getAuthors);

router.route('/me').put(basicAuthMiddleware, editAuthor);

router
  .route('/:id')
  .get(getAuthor)

  .delete(basicAuthMiddleware, deleteAuthor);

export default router;
