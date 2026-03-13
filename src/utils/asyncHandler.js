/**
 * Wraps async route handlers to forward rejected promises to next(err).
 * Eliminates try/catch boilerplate in controllers.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
