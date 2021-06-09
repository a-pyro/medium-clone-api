import ErrorResponse from '../../utils/errorResponse.js';

import AuthorsModel from '../../models/Authors.js';
import { verifyJWT } from './tools.js';

// export const basicAuthMiddleware = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return next(new ErrorResponse('Please provide auth', 401));
//   }

//   const decoded = atob(authorization.split(' ')[1]);

//   const [email, password] = decoded.split(':');

//   const user = await AuthorsModel.checkCredentials(email, password);

//   if (!user) {
//     return next(
//       new ErrorResponse('Provided credentials are wrong! Try again', 401)
//     );
//   } else {
//     req.user = user;
//     next();
//   }
// };

export const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await verifyJWT(token);
    const user = await AuthorsModel.findOne({ _id: decoded._id });

    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(`Please authenticate`, 401));
  }
};
