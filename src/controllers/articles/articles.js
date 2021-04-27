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
