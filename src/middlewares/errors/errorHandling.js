export const errorHandler = async (err, req, res, next) => {
  if (err.message.includes('validation failed')) {
    return res.status(400).send({ success: false, error: err.message });
  }
  res.status(err.statusCode || 500).send({
    success: false,
    error: err.message || 'internal server error',
  });
};
