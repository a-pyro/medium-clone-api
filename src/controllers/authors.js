import AuthorModel from '../models/Authors.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorModel.find();
    res.status(200).send({ success: true, data: authors });
  } catch (error) {
    next(error);
  }
};

export const addAuthor = async (req, res, next) => {
  try {
    const newAuthor = await AuthorModel.create(req.body);
    const { _id } = newAuthor;
    res.status(201).send({ success: true, data: _id });
  } catch (error) {
    next(error);
  }
};

export const getPersonalProfile = async (req, res, next) => {
  try {
    // const author = await AuthorModel.findAuthorWithArticles(id);
    res.status(200).send(req.user);
  } catch (error) {
    next(error);
  }
};
export const getAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const author = await AuthorModel.findAuthorWithArticles(id);
    const author = await AuthorModel.findById(id).populate('articles');
    if (!author) return next(new ErrorResponse(`resource not found`, 404));
    res.status(200).send({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

export const editAuthor = async (req, res, next) => {
  try {
    req.user.save();
    res.send(req.user);
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};
