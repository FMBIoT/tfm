function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    code: statusCode,
    message: err.message,
    originalUrl: req.originalUrl,
    stack: process.env.NODE_ENV === 'production' ? `${statusCode} - ${err.message} - ${req.originalUrl}` : err.stack
  });
}

module.exports = {
  notFound,
  errorHandler
};
