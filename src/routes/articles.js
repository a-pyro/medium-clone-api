import { Router } from 'express';
import {
  deleteArticle,
  editArticle,
  getArticle,
  getArticles,
  postArticle,
  getReviews,
  postReview,
  getSingleReview,
  editReview,
  deleteReview,
} from '../controllers/articles.js';

const router = Router();

router.route('/').get(getArticles).post(postArticle);
router.route('/:id').get(getArticle).put(editArticle).delete(deleteArticle);
/* 
reviews route
*/
router.route('/:id/reviews').get(getReviews).post(postReview);
router
  .route('/:id/reviews/:reviewId')
  .get(getSingleReview)
  .put(editReview)
  .delete(deleteReview);

export default router;
