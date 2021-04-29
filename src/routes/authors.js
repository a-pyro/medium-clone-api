import { Router } from 'express';
import {
  getAuthors,
  addAuthor,
  getAuthor,
  editAuthor,
  deleteAuthor,
} from '../controllers/authors.js';

const router = Router();

router.route('/').get(getAuthors).post(addAuthor);
router.route('/:id').get(getAuthor).put(editAuthor).delete(deleteAuthor);

export default router;
