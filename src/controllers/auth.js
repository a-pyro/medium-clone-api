import AuthorsModel from '../models/Authors.js';

export const registrationHandler = async (req, res, next) => {
  try {
    const newUser = await AuthorsModel.create(req.body);
    const { _id } = newUser;
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
};
export const loginHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const refreshTokenHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
