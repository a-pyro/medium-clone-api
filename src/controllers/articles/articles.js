import ArticleModel from '../../models/Articles.js';

export const getArticles = async (req, res, next) => {
  try {
    res.send('hi');
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
  } catch (error) {
    next(error);
  }
};
export const editArticle = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
