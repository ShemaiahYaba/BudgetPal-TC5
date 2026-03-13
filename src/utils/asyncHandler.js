'use strict';

/**
 * Wraps async route handlers to forward any rejected promise to next(err),
 * eliminating the need for try/catch in every controller.
 *
 * Usage:
 *   router.get('/', asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
