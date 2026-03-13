/**
 * asyncHandler — wraps async controllers so errors propagate to next(err).
 *
 * Without this, an unhandled throw inside an async controller is an unhandled
 * rejection that Express never sees. With it, the rejection is caught and
 * passed to the global errorHandler automatically — no try/catch needed.
 *
 * Usage in routes:
 *   import asyncHandler from '../utils/asyncHandler.js';
 *   router.get('/transactions', authMiddleware, asyncHandler(getTransactions));
 *
 * Usage in controllers (no try/catch required):
 *   const getTransactions = async (req, res) => {
 *     const data = await Transaction.findAll(...);
 *     sendSuccess(res, data, 'Transactions retrieved');
 *   };
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
