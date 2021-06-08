import ArticleModel from '../models/Articles.js';
import AuthorModel from '../models/Authors.js';
import ErrorResponse from '../utils/errorResponse.js';
import mongoose from 'mongoose';
import q2m from 'query-to-mongo';

export const getArticles = async (req, res, next) => {
  try {
    const { criteria, options, links } = q2m(req.query);
    const query = q2m(req.query);
    // console.log(criteria, skip, limit, sort, links);
    console.log(query);
    const total = await ArticleModel.countDocuments(criteria);

    console.log(total);

    const articles = await ArticleModel.find(criteria, options.fields)
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit);
    res.send({
      success: true,
      links: links('/articles', total),
      data: articles,
    });
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

export const getArticlesFromAutheiticatedUser = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({ _id: req.user._id });
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
};
export const postArticle = async (req, res, next) => {
  try {
    const newArticle = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const savedArticle = await ArticleModel.create(newArticle);
    const { authorId } = savedArticle;
    const { _id } = savedArticle;
    // pusho nell'array degli autori
    const author = await AuthorModel.findById(authorId);
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      authorId,
      {
        $push: {
          articles: _id,
        },
      },
      { runValidators: true, new: true }
    );
    console.log(author);
    res.status(201).send({ success: true, _id });
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
    const newArticle = { ...req.body, updatedAt: new Date() };
    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      newArticle,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!article) {
      return next(new ErrorResponse(`resource not found with that id`, 404));
    }
    res.status(200).send({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// GET articles/:id/reviews ✅
export const getReviews = async (req, res, next) => {
  try {
    const id = req.params.id;

    const reviews = await ArticleModel.findById(id, {
      reviews: 1,
      _id: 0,
    });
    if (!reviews) return next(new ErrorResponse(`resource not found`, 404));
    res.status(200).send({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

//  POST articles/:id/reviews ✅
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
      { runValidators: true, new: true, projection: { reviews: 1 } }
    );
    if (!updatedArticles)
      return next(new ErrorResponse(`article not found`, 404));
    // console.log(updatedArticles);
    res.status(201).send({ success: true, data: updatedArticles });
  } catch (error) {
    next(error);
  }
};

// GET articles/:id/reviews/:reviewId ✅ ✍🏻
export const getSingleReview = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const reviewId = req.params.reviewId;
    const { reviews } = await ArticleModel.findOne(
      { _id: mongoose.Types.ObjectId(userId) },
      {
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(reviewId) },
        },
      }
    );
    // console.log(reviews);
    if (reviews) {
      const data = reviews.length > 0 ? reviews[0] : reviews;
      return res.status(200).send({
        success: true,
        data,
      });
    } else {
      return next(new ErrorResponse(`resource not found`, 404));
    }
  } catch (error) {
    next(error);
  }
};

// PUT articles/:id/reviews/:reviewId
export const editReview = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const reviewId = req.params.reviewId;
    const { reviews } = await ArticleModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(userId),
        'reviews._id': mongoose.Types.ObjectId(reviewId),
      },
      { $set: { 'reviews.$': { ...req.body, _id: reviewId } } },
      {
        runValidators: true,
        new: true,
        projection: { reviews: 1 },
        timestamps: true,
      }
    );
    console.log(reviews);
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

// DELETE articles/:id/reviews/:reviewId
export const deleteReview = async (req, res, next) => {
  try {
    const id = req.params.id;
    const reviewId = req.params.reviewId;
    const modified = await ArticleModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          reviews: { _id: mongoose.Types.ObjectId(reviewId) },
        },
      },
      { new: true }
    );
    res.status(200).send({ success: true, data: modified });
  } catch (error) {
    next(error);
  }
};
