import { Router } from 'express';
import {
  getAuthors,
  addAuthor,
  getAuthor,
  editAuthor,
  deleteAuthor,
} from '../controllers/authors.js';

const router = Router();

router.route('/register').post(addAuthor);

router.route('/').get(getAuthors);

router.route('/me').put(editAuthor);

router
  .route('/:id')
  .get(getAuthor)

  .delete(deleteAuthor);

export default router;
