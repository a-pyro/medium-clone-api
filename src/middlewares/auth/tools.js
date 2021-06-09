import jwt from 'jsonwebtoken';
import AuthorsModel from '../../models/Authors.js';

export const authenticate = async (user) => {
  const { _id } = user;
  const newAcessToken = await generateJWT({ _id });

  const newRefreshToken = await generateRefreshToken({ _id });

  user.refreshToken = newRefreshToken;

  return { token: newAcessToken, refreshToken: newRefreshToken };
};

const generateJWT = (payload) => {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '10m' },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    );
  });
};

const generateRefreshToken = (payload) => {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1w' },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    );
  });
};

export const verifyJWT = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    });
  });
};
