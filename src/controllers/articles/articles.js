import ArticleModel from '../../models/Articles.js';
import ErrorResponse from '../../utils/errorResponse.js';

export const getArticles = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find();
    res.send({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};
export const getArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      return next(
        new ErrorResponse(`Article with id ${req.params.id} not found`)
      );
    }
    res.status(200).send({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};
export const postArticle = async (req, res, next) => {
  try {
    const newArticle = await ArticleModel.create(req.body);
    const { _id } = newArticle;
    res.send({ success: true, _id });
  } catch (error) {
    next(error);
  }
};
export const deleteArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);
    console.log(article);
    if (!article) {
      return next(
        new ErrorResponse(`Article not found with id: ${req.params.id}`, 404)
      );
    }
    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
};
export const editArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!article) {
      return next(new ErrorResponse(`Article not found with that id`, 404));
    }
    res.status(200).send({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// GET articles/:id/reviews
export const getReviews = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};

//  POST articles/:id/reviews
export const postReview = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const reviewToInsert = req.body;
    console.log(reviewToInsert);
    const updatedArticles = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $push: {
          reviews: reviewToInsert,
        },
      },
      { runValidators: true, new: true, timestamps: true }
    );
    if (!updatedArticles)
      return next(new ErrorResponse(`article not found`, 404));
    console.log(updatedArticles);
    res.send({ success: true, data: updatedArticles });
  } catch (error) {
    next(error);
  }
};

// GET articles/:id/reviews/:reviewId
export const getSingleReview = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// PUT articles/:id/reviews/:reviewId
export const editReview = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// DELETE articles/:id/reviews/:reviewId
export const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
