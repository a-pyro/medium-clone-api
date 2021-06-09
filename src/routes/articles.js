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
  getArticlesFromAutheiticatedUser,
} from '../controllers/articles.js';

const router = Router();

router.route('/').get(getArticles);
router.route('/').post(postArticle);

router.route('/me/stories').get(getArticlesFromAutheiticatedUser);

router.route('/:id').get(getArticle);
router.route('/:id').put(editArticle).delete(deleteArticle);
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
