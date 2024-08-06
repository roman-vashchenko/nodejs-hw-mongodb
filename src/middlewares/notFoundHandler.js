import createError from 'http-errors';

// eslint-disable-next-line no-unused-vars
export const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Route not found'));
};
