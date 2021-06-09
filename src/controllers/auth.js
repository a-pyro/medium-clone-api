import { authenticate } from '../middlewares/auth/tools.js';
import AuthorsModel from '../models/Authors.js';
import ErrorResponse from '../utils/errorResponse.js';

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
    const { email, password } = req.body;
    const user = await AuthorsModel.checkCredentials(email, password);
    if (!user) return next(new ErrorResponse(`Invalid credential`, 401));
    const tokens = await authenticate(user);
    res.status(200).send(tokens);
  } catch (error) {
    next(error);
  }
};
export const logoutHandler = async (req, res, next) => {
  try {
    req.user.refreshToken = null;
    await req.user.save();
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
