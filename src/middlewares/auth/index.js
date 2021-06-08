import ErrorResponse from '../../utils/errorResponse.js';
import atob from 'atob';
import AuthorsModel from '../../models/Authors.js';

export const basicAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ErrorResponse('Please provide auth', 401));
  }

  const decoded = atob(authorization.split(' ')[1]);

  const [email, password] = decoded.split(':');

  const user = await AuthorsModel.checkCredentials(email, password);

  if (!user) {
    return next(
      new ErrorResponse('Provided credentials are wrong! Try again', 401)
    );
  } else {
    req.user = user;
    next();
  }
};
