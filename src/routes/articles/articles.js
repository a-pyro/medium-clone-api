import { Router } from 'express';
import {
  deleteArticle,
  editArticle,
  getArticle,
  getArticles,
  postArticle,
} from '../../controllers/articles/articles.js';

const router = Router();

router.route('/').get(getArticles).post(postArticle);
router.route('/:id').get(getArticle).put(editArticle).delete(deleteArticle);

export default router;
